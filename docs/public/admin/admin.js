import { createClient } from 'npm:@supabase/supabase-js@2'

const supabaseUrl = 'https://efyehoznpzaaqelgxibl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmeWVob3pucHphYXFlbGd4aWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MTA1NjgsImV4cCI6MjA2NTI4NjU2OH0.RyE6U1frOhI3YDCpeV2OL_6WS7wyQT9DCgaAIUecbPg';

// Création du client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Vérification de la connexion
async function checkConnection() {
  console.log('Vérification de la connexion à Supabase...');
  
  // Vérification de la session actuelle
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError) {
    console.error('Erreur de session:', sessionError);
    return false;
  }
  
  if (session) {
    console.log('✅ Connecté en tant que:', session.user.email);
    return true;
  } else {
    console.log('ℹ️ Aucune session active. Connexion anonyme.');
    // Vérification de la connexion anonyme avec une requête simple
    try {
      const { data, error } = await supabase
        .from('name')
        .select('*')
        .limit(1);
      
      if (error) throw error;
      
      console.log('✅ Connecté anonymement à Supabase');
      console.log('Données de test:', data);
      return true;
    } catch (error) {
      console.error('❌ Erreur de connexion à Supabase:', error);
      return false;
    }
  }
}

// Exécution de la vérification
checkConnection().then(isConnected => {
  if (isConnected) {
    console.log('Prêt à utiliser Supabase!');
  }
});

async function fetchData(email, password) {
  try {
    console.log('Tentative de connexion...');
    
    // Étape 1: Connexion avec email/mot de passe
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email || 'votre@email.com',  // Remplacez par une valeur par défaut ou utilisez un formulaire
      password: password || 'votremotdepasse'  // ⚠️ À ne pas faire en production
    });

    if (authError) {
      console.error('Erreur de connexion:', authError.message);
      return { error: authError };
    }

    console.log('✅ Connecté avec succès en tant que:', authData.user.email);

    // Étape 2: Récupération des données
    console.log('Récupération des données...');
    const { data, error } = await supabase
      .from('name')
      .select('*');

    if (error) {
      console.error('Erreur de récupération des données:', error);
      return { error };
    }

    console.log('✅ Données récupérées avec succès');
    return { data, user: authData.user };
    
  } catch (error) {
    console.error('Erreur inattendue:', error);
    return { error };
  }
}

// Exemple d'utilisation :
// Pour tester immédiatement (à supprimer en production)
fetchData('vb.brebionpro@gmail.com', 'Azertyuiop1234567890@#')
  .then(({ data, user, error }) => {
    if (error) return;
    console.log('Utilisateur connecté:', user);
    console.log('Données:', data);
  });