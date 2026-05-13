import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function GeneralAdmin({ tableName, title, fields, bucketName }: { tableName: string, title: string, fields: any[], bucketName?: string }) {
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [tableName]);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from(tableName).select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error(`Failed to fetch ${title}: ` + error.message);
    } else {
      setDataList(data || []);
    }
    setLoading(false);
  };

  const handleOpenDialog = (item: any = null) => {
    setCurrentItem(item);
    if (item) {
      setFormData(item);
    } else {
      setFormData({});
    }
    setFile(null);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    let payload = { ...formData };

    if (file && bucketName) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError, data } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);
      
      if (uploadError) {
        toast.error('Error uploading file: ' + uploadError.message);
        setIsSubmitting(false);
        return;
      }
      
      const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(data.path);
      payload[fields.find(f => f.type === 'file')?.name || 'image_url'] = publicUrl;
    }

    // Clean up file field from payload if it exists
    delete payload.file;

    let error;
    if (currentItem) {
      const { id, created_at, ...updateData } = payload;
      const res = await supabase.from(tableName).update(updateData).eq('id', currentItem.id);
      error = res.error;
    } else {
      const res = await supabase.from(tableName).insert([payload]);
      error = res.error;
    }

    setIsSubmitting(false);

    if (error) {
      toast.error('Failed to save data: ' + error.message);
    } else {
      toast.success(currentItem ? 'Updated successfully' : 'Added successfully');
      setIsDialogOpen(false);
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you confirm to delete this item?')) return;
    
    const { error } = await supabase.from(tableName).delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete: ' + error.message);
    } else {
      toast.success('Deleted successfully');
      fetchData();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button onClick={() => handleOpenDialog()} className="bg-primary text-black hover:bg-primary/90" />}>
              <Plus className="w-4 h-4 mr-2" /> Add New
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{currentItem ? 'Edit' : 'Add New'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label>{field.label}</Label>
                  {field.type === 'file' ? (
                    <>
                      <Input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files?.[0] || null)} />
                      {formData[field.name] && !file && (
                        <img src={formData[field.name]} alt="preview" className="h-20 object-cover mt-2 rounded" />
                      )}
                    </>
                  ) : (
                    <Input 
                      type={field.type || 'text'} 
                      value={formData[field.name] || ''} 
                      onChange={e => setFormData({ ...formData, [field.name]: e.target.value })} 
                      placeholder={field.placeholder || ''}
                    />
                  )}
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={handleSave} disabled={isSubmitting} className="bg-primary text-black hover:bg-primary/90">
                {isSubmitting ? 'Saving...' : 'Save Data'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-x-auto bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {fields.map(f => (
                <TableHead key={f.name}>{f.label}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={fields.length + 1} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : dataList.length === 0 ? (
              <TableRow><TableCell colSpan={fields.length + 1} className="text-center py-8 text-muted-foreground">No records found.</TableCell></TableRow>
            ) : (
              dataList.map((item) => (
                <TableRow key={item.id}>
                  {fields.map(f => (
                    <TableCell key={f.name}>
                      {f.type === 'file' ? (
                        item[f.name] ? <img src={item[f.name]} className="w-10 h-10 object-cover rounded" /> : 'No Media'
                      ) : (
                        item[f.name]
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(item)}>
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
