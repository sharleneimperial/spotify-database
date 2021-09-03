const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

// database
const { Song, Artist, User, Album } = require('./models');

app.get('/', (req, res) => {
    res.send('Music App');
});


app.get('/:artist/songs', async (req, res) => { // /drake/songs
    let artist = req.params.artist;

    let fetchArtist = await Artist.findOne({
        where: { name: artist },
        include: [Song]
    });

    const songs = fetchArtist.Songs;

    console.log(songs); 
});

/*
    {
        name: 'Drake',
        bio: 'this is a bio',
        Songs: [
            {
                title: 'Western Road Flows'
                duration: 180
            }
        ]
    }
    */
// if we want only all of the albums
app.get('/:artist/albums', async (req, res) => { // /drake/songs
    let artist = req.params.artist;

    let fetchArtist = await Artist.findOne({
        where: { name: artist },
        include: [Album]
    });
    const albums = fetchArtist.Albums;

    console.log(albums); 
});

/*
    {
        name: 'Drake',
        bio: 'this is a bio',
        Albums: [
            {
                title: 'Certified Lover Boy'
                duration: 180
            }
        ]
    }
    */

   

// if we want one album and then all songs -> Get Album
app.get('/:artist/:album', async (req, res) => { // /drake/songs
    let artist = req.params.artist;
    let albumInput = req.params.album;

    let fetchArtist = await Artist.findOne({
        where: { name: artist },
        include: [Album]
    });
    const albums = fetchArtist.Albums;

    let filterAlbums = albums.filter(function(alb) {
        // get clean album
        alb = alb.toJSON();
        if (alb.name === albumInput) {
            return true
        }
    });

    // get album out of array -> there is only one album
    let fetchAlbum = filterAlbums[0];

    let songs = fetchAlbum.getSongs();
    console.log(songs)

});


// if we want all albums and songs -> Get Songs and Albums
app.get('/:artist/:album/songs', async (req, res) => { // /drake/songs
    let artist = req.params.artist;

    let fetchArtist = await Artist.findOne({
        where: { name: artist },
        include: [Album, Song]
    });
    const albums = fetchArtist.Albums;
    const songs = fetchArtist.Songs;

    console.log(albums);
    console.log(songs);
    
});


app.listen(PORT);