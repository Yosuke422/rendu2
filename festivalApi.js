const baseURL = 'https://data.culture.gouv.fr/api/records/1.0/search/';

class FestivalLibrary {
  static async getAllFestivals() {
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      return data.records;
    } catch (error) {
      console.error('Erreur lors de la récupération des festivals :', error);
      return [];
    }
  }

  static async getFestivalsByRegion(region) {
    try {
      const response = await fetch(`${baseURL}?dataset=panorama-des-festivals&facet=region&refine.region=${region}`);
      const data = await response.json();
      return data.records;
    } catch (error) {
      console.error('Erreur lors de la récupération des festivals par région :', error);
      return [];
    }
  }

  static async getFestivalsByDepartment(department) {
    try {
      const response = await fetch(`${baseURL}?dataset=panorama-des-festivals&facet=departement&refine.departement=${department}`);
      const data = await response.json();
      return data.records;
    } catch (error) {
      console.error('Erreur lors de la récupération des festivals par département :', error);
      return [];
    }
  }

  static async getFestivalsByStartMonth(startMonth) {
    try {
      const response = await fetch(`${baseURL}?dataset=panorama-des-festivals&facet=mois_habituel_de_debut&refine.mois_habituel_de_debut=${startMonth}`);
      const data = await response.json();
      return data.records;
    } catch (error) {
      console.error('Erreur lors de la récupération des festivals par mois de début :', error);
      return [];
    }
  }

  static async getFilteredFestivals(filters) {
    try {
      const queryString = Object.entries(filters).map(([key, value]) => `${key}=${value}`).join('&');
      const response = await fetch(`${baseURL}?dataset=panorama-des-festivals&${queryString}`);
      const data = await response.json();
      return data.records;
    } catch (error) {
      console.error('Erreur lors de la récupération des festivals avec filtres :', error);
      return [];
    }
  }
}

module.exports = FestivalLibrary;
