import supabase from './docs/config/supabaseClient.js';

// Exemple d'utilisation
async function fetchData() {
  const { data, error } = await supabase.from('name').select('*');
  if (error) {
    console.error('Erreur :', error);
  } else {
    console.log('Données récupérées :', data);
  }
}

fetchData();