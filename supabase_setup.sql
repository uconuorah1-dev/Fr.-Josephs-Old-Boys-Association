-- 1. Create Tables
CREATE TABLE IF NOT EXISTS public.alumni_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    profession TEXT,
    photo_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    media_url TEXT NOT NULL,
    media_type TEXT DEFAULT 'image', -- 'image' or 'video'
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    graduation_year INTEGER NOT NULL,
    profession TEXT NOT NULL,
    motivation TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'banned'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Turn on Row Level Security (RLS)
ALTER TABLE public.alumni_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to prevent "policy already exists" errors
DROP POLICY IF EXISTS "Allow public read access" ON public.alumni_members;
DROP POLICY IF EXISTS "Allow public read access" ON public.events;
DROP POLICY IF EXISTS "Allow public read access" ON public.gallery;
DROP POLICY IF EXISTS "Allow public read access" ON public.testimonials;
DROP POLICY IF EXISTS "Allow public insert access" ON public.registrations;

DROP POLICY IF EXISTS "Allow authenticated full access to alumni_members" ON public.alumni_members;
DROP POLICY IF EXISTS "Allow authenticated full access to events" ON public.events;
DROP POLICY IF EXISTS "Allow authenticated full access to gallery" ON public.gallery;
DROP POLICY IF EXISTS "Allow authenticated full access to testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow authenticated full access to registrations" ON public.registrations;

-- 4. Create Policies
CREATE POLICY "Allow public read access" ON public.alumni_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.registrations FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated full access to alumni_members" ON public.alumni_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to events" ON public.events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to registrations" ON public.registrations FOR ALL USING (auth.role() = 'authenticated');

-- 5. Create Storage Buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('alumni-images', 'alumni-images', true),
  ('event-images', 'event-images', true),
  ('event-videos', 'event-videos', true),
  ('chairman-photos', 'chairman-photos', true),
  ('gallery-media', 'gallery-media', true)
ON CONFLICT (id) DO UPDATE SET public = excluded.public;

-- 6. Storage Policies
DROP POLICY IF EXISTS "Give public access to alumni-images" ON storage.objects;
DROP POLICY IF EXISTS "Give public access to event-images" ON storage.objects;
DROP POLICY IF EXISTS "Give public access to event-videos" ON storage.objects;
DROP POLICY IF EXISTS "Give public access to chairman-photos" ON storage.objects;
DROP POLICY IF EXISTS "Give public access to gallery-media" ON storage.objects;
DROP POLICY IF EXISTS "Give authenticated users full access to storage" ON storage.objects;

CREATE POLICY "Give public access to alumni-images" ON storage.objects FOR SELECT USING (bucket_id = 'alumni-images');
CREATE POLICY "Give public access to event-images" ON storage.objects FOR SELECT USING (bucket_id = 'event-images');
CREATE POLICY "Give public access to event-videos" ON storage.objects FOR SELECT USING (bucket_id = 'event-videos');
CREATE POLICY "Give public access to chairman-photos" ON storage.objects FOR SELECT USING (bucket_id = 'chairman-photos');
CREATE POLICY "Give public access to gallery-media" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-media');

CREATE POLICY "Give authenticated users full access to storage" ON storage.objects FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- 7. Grant Privileges
GRANT ALL ON TABLE public.alumni_members TO anon, authenticated;
GRANT ALL ON TABLE public.events TO anon, authenticated;
GRANT ALL ON TABLE public.gallery TO anon, authenticated;
GRANT ALL ON TABLE public.testimonials TO anon, authenticated;
GRANT ALL ON TABLE public.registrations TO anon, authenticated;
