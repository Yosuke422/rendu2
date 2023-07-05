const FestivalLibrary = require('../festivalApi')

describe('FestivalLibrary', () => {
  describe('getAllFestivals', () => {
    it('should fetch all festivals successfully', async () => {
      const mockResponse = {
        records: [
          { id: 1, name: 'Festival 1' },
          { id: 2, name: 'Festival 2' },
          { id: 3, name: 'Festival 3' },
        ],
      };

      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const festivals = await FestivalLibrary.getAllFestivals();

      expect(fetch).toHaveBeenCalledWith('https://data.culture.gouv.fr/api/records/1.0/search/');
      expect(festivals).toEqual(mockResponse.records);
    });

    it('should handle error during festival retrieval', async () => {
      const mockError = new Error('Failed to fetch festivals');

      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.reject(mockError)
      );

      const festivals = await FestivalLibrary.getAllFestivals();

      expect(fetch).toHaveBeenCalledWith('https://data.culture.gouv.fr/api/records/1.0/search/');
      expect(festivals).toEqual([]);
    });
  });

  describe('getFestivalsByRegion', () => {
    it('should fetch festivals by region successfully', async () => {
      const mockResponse = {
        records: [
          { id: 1, name: 'Festival 1', region: 'Region 1' },
          { id: 2, name: 'Festival 2', region: 'Region 1' },
        ],
      };

      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const region = 'Region 1';
      const festivals = await FestivalLibrary.getFestivalsByRegion(region);

      expect(fetch).toHaveBeenCalledWith('https://data.culture.gouv.fr/api/records/1.0/search/?dataset=panorama-des-festivals&facet=region&refine.region=Region 1');
      expect(festivals).toEqual(mockResponse.records);
    });

    it('should handle error during festival retrieval by region', async () => {
      const mockError = new Error('Failed to fetch festivals by region');

      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.reject(mockError)
      );

      const region = 'Region 1';
      const festivals = await FestivalLibrary.getFestivalsByRegion(region);

      expect(fetch).toHaveBeenCalledWith('https://data.culture.gouv.fr/api/records/1.0/search/?dataset=panorama-des-festivals&facet=region&refine.region=Region 1');
      expect(festivals).toEqual([]);
    });
  });
});
