const {expect} = require('chai');
const {syncAndSeed} = require('./db')

describe('Models', () => {
  let seed;
  beforeEach(async () => {
    seed = await syncAndSeed();
  })
  describe('seeded data', () => {
    it('includes three artists', () => {
      expect(seed.artists.length).to.equal(3)
    })
  });
  describe('seeded songs data', () => {
    it('includes three songs', () => {
      expect(seed.songs.length).to.equal(3)
    })
  });
  describe('seeded albums data', () => {
    it('includes three albums', () => {
      expect(seed.albums.length).to.equal(3)
    })
  });
  describe('seeded tracks data', () => {
    it('includes three tracks', () => {
      expect(seed.tracks.length).to.equal(3)
    })
  });
});