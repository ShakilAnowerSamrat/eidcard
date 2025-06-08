-- Create greetings table
CREATE TABLE IF NOT EXISTS greetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  message TEXT NOT NULL,
  frame_style TEXT,
  custom_colors JSONB,
  card_size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id TEXT
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_greetings_user_id ON greetings(user_id);
CREATE INDEX IF NOT EXISTS idx_greetings_created_at ON greetings(created_at);
