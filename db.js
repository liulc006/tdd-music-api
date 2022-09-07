const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const UUID = Sequelize.DataTypes.UUID;
const UUIDV4 = Sequelize.DataTypes.UUIDV4;

const Artist = conn.define('artist', {
    id:{
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

const Song = conn.define('song', {
    id:{
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

Song.belongsTo(Artist);
Artist.hasMany(Song);

const syncAndSeed = async() => {
    await conn.sync({force: true});
    const artists = await Promise.all([
        Artist.create({name: 'Madonna'}),
        Artist.create({name: 'BlackPink'}),
        Artist.create({name: 'BTS'})
    ]);

    const songs = await Promise.all([
        Song.create({name: "Papa Don't Preach", duration: '5'}),
        Song.create({name: "Butter", duration: '3'}),
        Song.create({name: "MIC Drop", duration: '4'}),
    ])
    return {artists: artists, 
            songs: songs};
};

module.exports = {
    syncAndSeed,
    Artist
}