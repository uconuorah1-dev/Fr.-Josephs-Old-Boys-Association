import { useState } from 'react';
import { motion } from 'motion/react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function Registration() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    graduationYear: '',
    profession: '',
    motivation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // API call for registration
    try {
      const { error } = await supabase.from('registrations').insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone_number: formData.phone,
          graduation_year: parseInt(formData.graduationYear),
          profession: formData.profession,
          motivation: formData.motivation
        }
      ]);
      
      if (error) throw error;
      
      toast.success("Your registration has been submitted successfully. An administrator will review and get back to you.", {
        duration: 5000,
      });
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || "Failed to submit registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">Join the Association</h1>
          <p className="text-gray-600 text-lg">
            Reconnect with old friends, network, and contribute to the growth of our alma mater.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <Input name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="John Doe" className="h-12" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <Input name="email" value={formData.email} onChange={handleChange} type="email" required placeholder="john@example.com" className="h-12" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <Input name="phone" value={formData.phone} onChange={handleChange} type="tel" required placeholder="+234..." className="h-12" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Graduation Year</label>
              <Input name="graduationYear" value={formData.graduationYear} onChange={handleChange} type="number" required placeholder="e.g. 2010" className="h-12" min="1950" max="2030" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Current Profession / Occupation</label>
            <Input name="profession" value={formData.profession} onChange={handleChange} required placeholder="Software Engineer" className="h-12" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Why do you want to join? (Optional)</label>
            <Textarea name="motivation" value={formData.motivation} onChange={handleChange} placeholder="Share a few words about your motivation..." className="min-h-[100px]" />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 text-lg bg-primary text-black hover:bg-primary/90 font-bold rounded-xl"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
