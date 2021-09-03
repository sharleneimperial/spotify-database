'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Album.belongsTo(models.Artist, { foreignKey: 'artistId' });
      models.Album.hasMany(models.Song, { foreignKey: 'albumId' });
    }
  };
  Album.init({
    name: DataTypes.STRING,
    label: DataTypes.STRING,
    genre: DataTypes.STRING,
    releaseYear: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};

/*
```
sequelize model:create --name Album --attributes name:string,label:string,genre:string,releaseYear:integer,artistId
```