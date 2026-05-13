import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, Ban, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function RegistrationsAdmin() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch registrations');
    } else {
      setRegistrations(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleUpdateStatus = async (reg: any, status: string) => {
    try {
      const { error } = await supabase
        .from('registrations')
        .update({ status })
        .eq('id', reg.id);

      if (error) throw error;
      
      toast.success(`User set to ${status}`);
      
      // If verified, trigger automatic email
      if (status === 'verified') {
        fetch('/api/send-verification-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: reg.email, name: reg.full_name }),
        }).then(res => res.json()).then(data => {
          if (data.previewUrl) {
             console.log("Email sent! Preview:", data.previewUrl);
             toast.success("Verification email sent!");
          }
        }).catch(err => {
          console.error("Failed to send email", err);
          toast.error("Failed to send verification email");
        });
      }

      fetchRegistrations();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;

    try {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Registration deleted');
      fetchRegistrations();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified': return <span className="inline-flex items-center rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white">Verified</span>;
      case 'banned': return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">Banned</span>;
      default: return <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 border border-yellow-200">Pending</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6">Manage Registrations</h2>

      {registrations.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-2xl">
          <p className="text-gray-500">No registrations found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Full Name</th>
                <th className="p-4 font-semibold text-gray-600">Contact</th>
                <th className="p-4 font-semibold text-gray-600">Year / Job</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-gray-900">{reg.full_name}</p>
                    <p className="text-sm text-gray-500">Applied: {new Date(reg.created_at).toLocaleDateString()}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{reg.email}</p>
                    <p className="text-sm text-gray-500">{reg.phone_number}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium">{reg.graduation_year}</p>
                    <p className="text-sm text-gray-500">{reg.profession}</p>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(reg.status)}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {reg.status !== 'verified' && (
                      <Button size="sm" onClick={() => handleUpdateStatus(reg, 'verified')} className="bg-green-500 hover:bg-green-600 text-white" title="Verify User">
                        <CheckCircle className="w-4 h-4 mr-1" /> Verify
                      </Button>
                    )}
                    {reg.status !== 'banned' && (
                      <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(reg, 'banned')} title="Ban User" className="border-red-200 text-red-600 hover:bg-red-50">
                        <Ban className="w-4 h-4 mr-1" /> Ban
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(reg.id)} className="text-gray-400 hover:text-red-600 hover:bg-red-50" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
