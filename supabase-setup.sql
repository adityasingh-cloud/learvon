-- Create the contacts table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the blog_views table
CREATE TABLE blog_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts (allow inserts for everyone, but only authenticated users can read)
CREATE POLICY "Allow public inserts on contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated reads on contacts" ON contacts FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for blog_views (allow everyone to read and update)
CREATE POLICY "Allow public reads on blog_views" ON blog_views FOR SELECT USING (true);
CREATE POLICY "Allow public updates on blog_views" ON blog_views FOR UPDATE USING (true);
CREATE POLICY "Allow public inserts on blog_views" ON blog_views FOR INSERT WITH CHECK (true);