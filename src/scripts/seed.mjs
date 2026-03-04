import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const mockStartups = [
    { name: 'EcoTech Solutions', category: 'Cleantech', location: 'Hanoi', description: 'AI-driven waste management systems.', logo: 'ES' },
    { name: 'FinFlow', category: 'Fintech', location: 'Ho Chi Minh', description: 'Seamless cross-border payment API for SMEs.', logo: 'FF' },
    { name: 'MedAI', category: 'Healthtech', location: 'Da Nang', description: 'Predictive diagnostics using machine learning.', logo: 'MA' },
    { name: 'AgriSmart', category: 'Agtech', location: 'Can Tho', description: 'IoT sensors for precision agriculture.', logo: 'AS' },
    { name: 'EduVerse', category: 'Edtech', location: 'Hanoi', description: 'VR-based immersive learning platforms.', logo: 'EV' },
    { name: 'LogiChain', category: 'Logistics', location: 'Hai Phong', description: 'Blockchain tracking for port operations.', logo: 'LC' },
];

const mockVentures = [
    { name: 'Alpha Capital', type: 'Venture Capital', focus: 'Deeptech, AI', region: 'APAC', logo: 'AC' },
    { name: 'NextGen Partners', type: 'Corporate VC', focus: 'Retail, E-commerce', region: 'Global', logo: 'NP' },
    { name: 'Oceanic Ventures', type: 'Angel Syndicate', focus: 'Cleantech, Agtech', region: 'SEA', logo: 'OV' },
    { name: 'Pioneer Fund', type: 'Venture Capital', focus: 'Fintech, Web3', region: 'North America', logo: 'PF' },
];

async function seedData() {
    console.log('Inserting mock startups...');
    const { error: errorStartups } = await supabase.from('startups').insert(mockStartups);
    if (errorStartups) console.error('Error inserting startups:', errorStartups);
    else console.log('Successfully inserted startups.');

    console.log('Inserting mock ventures...');
    const { error: errorVentures } = await supabase.from('ventures').insert(mockVentures);
    if (errorVentures) console.error('Error inserting ventures:', errorVentures);
    else console.log('Successfully inserted ventures.');
}

seedData();
