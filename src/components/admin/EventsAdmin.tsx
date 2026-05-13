import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function EventsAdmin() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').order('event_date', { ascending: false });
    if (error) {
      toast.error('Failed to fetch events: ' + error.message);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  const handleOpenDialog = (event: any = null) => {
    setCurrentEvent(event);
    if (event) {
      setTitle(event.title);
      setDescription(event.description || '');
      setEventDate(event.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : '');
      setImageUrl(event.image_url || '');
    } else {
      setTitle('');
      setDescription('');
      setEventDate('');
      setImageUrl('');
    }
    setFile(null);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title) {
      toast.error('Title is required');
      return;
    }
    setIsSubmitting(true);
    let uploadedImageUrl = imageUrl;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError, data } = await supabase.storage
        .from('event-images')
        .upload(fileName, file);
      
      if (uploadError) {
        toast.error('Error uploading image: ' + uploadError.message);
        setIsSubmitting(false);
        return;
      }
      
      const { data: { publicUrl } } = supabase.storage.from('event-images').getPublicUrl(data.path);
      uploadedImageUrl = publicUrl;
    }

    const payload = {
      title,
      description,
      event_date: eventDate || null,
      image_url: uploadedImageUrl,
    };

    let error;
    if (currentEvent) {
      // Update
      const res = await supabase.from('events').update(payload).eq('id', currentEvent.id);
      error = res.error;
    } else {
      // Insert
      const res = await supabase.from('events').insert([payload]);
      error = res.error;
    }

    setIsSubmitting(false);

    if (error) {
      toast.error('Failed to save event: ' + error.message);
    } else {
      toast.success(currentEvent ? 'Event updated successfully' : 'Event added successfully');
      setIsDialogOpen(false);
      fetchEvents();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete event: ' + error.message);
    } else {
      toast.success('Event deleted successfully');
      fetchEvents();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button onClick={() => handleOpenDialog()} className="bg-primary text-black hover:bg-primary/90" />}>
              <Plus className="w-4 h-4 mr-2" /> Add New Event
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{currentEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Event Title</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Annual General Meeting" required />
              </div>
              <div className="space-y-2">
                <Label>Date & Time</Label>
                <Input type="datetime-local" value={eventDate} onChange={e => setEventDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description here..." />
              </div>
              <div className="space-y-2">
                <Label>Image (Optional)</Label>
                <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
                {imageUrl && !file && (
                  <img src={imageUrl} alt="preview" className="h-20 object-cover mt-2 rounded" />
                )}
              </div>
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
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : events.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No events found.</TableCell></TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    {event.image_url ? (
                      <img src={event.image_url} alt={event.title} className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No Img</div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>
                    {event.event_date ? new Date(event.event_date).toLocaleString() : 'TBD'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(event)}>
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)}>
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
