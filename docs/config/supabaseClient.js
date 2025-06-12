import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();
// URL et clé publique de votre projet Supabase
const supabaseUrl = 'https://efyehoznpzaaqelgxibl.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_KEY;

// Initialisation du client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;