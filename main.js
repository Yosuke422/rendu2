const FestivalLibrary = require('./festivalLibrary');

async function main() {
  try {
    const allFestivals = await FestivalLibrary.getAllFestivals();
    console.log('Tous les festivals :', allFestivals);

    const festivalsByRegion = await FestivalLibrary.getFestivalsByRegion('Île-de-France');
    console.log('Festivals par région :', festivalsByRegion);

    const festivalsByDepartment = await FestivalLibrary.getFestivalsByDepartment('75');
    console.log('Festivals par département :', festivalsByDepartment);

    const festivalsByStartMonth = await FestivalLibrary.getFestivalsByStartMonth(7);
    console.log('Festivals par mois de début :', festivalsByStartMonth);

    const filteredFestivals = await FestivalLibrary.getFilteredFestivals({
      region: 'Provence-Alpes-Côte d\'Azur',
      departement: '13',
      mois_habituel_de_debut: 8
    });
    console.log('Festivals avec filtres :', filteredFestivals);
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
  }
}

main();
