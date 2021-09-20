const express = require("express");
const route = express.Router();
const connection = require("../database/db");
const fs = require("fs");
const path = require("path");

// ================================= Route index =================================
route.get("/", function (request, response) {
  const title = "Music App";
  const isLogin = request.session.isLogin;
  const userEmail = request.session.userEmail;
  const isAdmin = request.session.isAdmin;
  const isUser = request.session.isUser;
  const query = `SELECT tb_music.id, title, music, cover_music, tb_genre.name AS genre, tb_artis.name AS artis, tb_artis.photo AS photo, tb_artis.about AS about, tb_artis.start_career AS start_career FROM tb_music INNER JOIN tb_genre ON tb_music.genre_id = tb_genre.id INNER JOIN tb_artis ON tb_music.artis_id = tb_artis.id`;

  connection.query(query, function (err, results) {
    if (err) throw err;
    let isEmpty = false;
    if (results.length === 0) {
      isEmpty = true;
    }
    const musics = results;
    response.render("index", {
      title,
      isLogin,
      isAdmin,
      isUser,
      isEmpty,
      userEmail,
      musics,
    });
  });
});

// ================================= Route sign up =================================
route.post("/sign-up", function (request, response) {
  const { email, password } = request.body;
  const status = 2;
  const emailValidate = `SELECT * FROM tb_user WHERE email = "${email}"`;

  connection.query(emailValidate, function (err, results) {
    if (err) throw err;
    if (results.length === 1) {
      request.session.message = {
        icon: "error",
        title: "Email sudah terdaftar!",
      };
      response.redirect("/");
    } else {
      const query = `INSERT INTO tb_user (email, password, status) VALUES ("${email}", "${password}", ${status})`;
      connection.query(query, function (err, results) {
        if (err) throw err;
        request.session.message = {
          icon: "success",
          title: "Sign up berhasil!",
        };
        response.redirect("/");
      });
    }
  });
});

// ================================= Route login =================================
route.post("/login", function (request, response) {
  const { email, password } = request.body;
  const query = `SELECT * FROM tb_user WHERE email = "${email}" AND password = "${password}"`;

  connection.query(query, function (err, results) {
    if (err) throw err;

    if (results.length === 0) {
      request.session.message = {
        icon: "error",
        title: "Email atau password salah!",
      };
      response.redirect("/");
    } else {
      if (results[0].status === 1) {
        request.session.isAdmin = true;
      } else {
        request.session.isUser = true;
      }
      request.session.message = {
        icon: "success",
        title: `Selamat datang ${email}`,
      };
      request.session.userEmail = results[0].email;
      request.session.isLogin = true;
      request.session.user_id = results[0].id;
      response.redirect("/");
    }
  });
});

// ================================= Route logout =================================
route.get("/logout", function (request, response) {
  request.session.destroy();
  response.redirect("/");
});

// ================================= Route genre =================================
route.get("/genre", function (request, response) {
  const title = "Kelola Genre";
  const isAdmin = request.session.isAdmin;
  const isLogin = request.session.isLogin;
  const query = `SELECT * FROM tb_genre`;

  if (isLogin) {
    connection.query(query, function (err, results) {
      if (err) throw err;
      let notEmpty = false;
      if (results.length !== 0) {
        notEmpty = true;
      }
      const genres = results;
      response.render("genre", {
        title,
        isAdmin,
        isLogin,
        isActive: {
          genre: true,
        },
        notEmpty,
        genres,
      });
    });
  } else {
    response.redirect("/");
  }
});
route.post("/genre", function (request, response) {
  const genre = request.body.genre;
  const genreValidate = `SELECT * FROM tb_genre WHERE name = "${genre}"`;
  const query = `INSERT INTO tb_genre (name) VALUES ("${genre}")`;

  connection.query(genreValidate, function (err, results) {
    if (err) throw err;
    if (results.length === 1) {
      request.session.message = {
        icon: "error",
        title: "Nama genre sudah terdaftar!",
      };
      response.redirect("/genre");
    } else {
      connection.query(query, function (err) {
        if (err) throw err;
        request.session.message = {
          icon: "success",
          title: "Add genre berhasil!",
        };
        response.redirect("/genre");
      });
    }
  });
});
route.get("/delete-genre/:id", function (request, response) {
  const id = request.params.id;
  const query1 = `DELETE FROM tb_genre WHERE id = ${id}`;
  const query2 = `ALTER TABLE tb_genre AUTO_INCREMENT = ${id}`;

  connection.query(query1, function (err, results) {
    if (err) throw err;
    request.session.message = {
      icon: "success",
      title: "Hapus genre sukses!",
    };
    response.redirect("/genre");
  });
  connection.query(query2);
});
route.post("/edit-genre/:id", function (request, response) {
  const id = request.params.id;
  const genre = request.body.genre;
  const query = `UPDATE tb_genre SET name = "${genre}" WHERE id = ${id}`;

  connection.query(query, function (err, results) {
    if (err) throw err;
    request.session.message = {
      icon: "success",
      title: "Edit genre berhasil!",
    };
    response.redirect("/genre");
  });
});

// ================================= Route Artist =================================
route.get("/artist", function (request, response) {
  const title = "Kelola Artist";
  const isAdmin = request.session.isAdmin;
  const isLogin = request.session.isLogin;
  const query = `SELECT * FROM tb_artis`;

  if (isLogin) {
    connection.query(query, function (err, results) {
      if (err) throw err;
      let notEmpty = false;
      if (results.length !== 0) {
        notEmpty = true;
      }
      const artists = results;
      request.session.isActive = true;
      response.render("artist", {
        title,
        isAdmin,
        isLogin,
        isActive: {
          artist: true,
        },
        notEmpty,
        artists,
      });
    });
  } else {
    response.redirect("/");
  }
});
route.post("/artist", function (request, response) {
  const { artist, career, about } = request.body;
  const pathFile = path.join(__dirname + "/../uploads/img/");
  const filePhoto = request.files.photo;
  const namePhoto = Date.now() + filePhoto.name.replace(/\s/g, "");
  const uploadToFolder = pathFile + namePhoto;

  filePhoto.mv(uploadToFolder, function (err) {
    if (err) throw err;
  });

  const query = `INSERT INTO tb_artis (name, start_career, photo, about) VALUES ("${artist}", "${career}", "${namePhoto}", "${about}")`;

  connection.query(query, function (err, results) {
    if (err) throw err;
    request.session.message = {
      icon: "success",
      title: "Data berhasil ditambahkan!",
    };
    response.redirect("/artist");
  });
});
route.get("/delete-artist/:id", function (request, response) {
  const id = request.params.id;
  const pathFile = path.join(__dirname + "/../uploads/img/");
  const query1 = `DELETE FROM tb_artis WHERE id = ${id}`;
  const query2 = `ALTER TABLE tb_artis AUTO_INCREMENT = ${id}`;
  const musicValidate = `SELECT * FROM tb_music WHERE artis_id = ${id}`;
  const findArtist = `SELECT * FROM tb_artis WHERE id = ${id}`;

  connection.query(musicValidate, function (err, results) {
    if (err) throw err;
    if (results.length === 0) {
      connection.query(findArtist, function (err, results) {
        if (err) throw err;
        const path = pathFile + results[0].photo;
        fs.unlinkSync(path);
        connection.query(query1, function (err) {
          if (err) throw err;
          request.session.message = {
            icon: "success",
            title: "Hapus artist sukses!",
          };
          response.redirect("/artist");
        });
        connection.query(query2);
      });
    } else {
      request.session.message = {
        icon: "error",
        title: "Data tidak dapat dihapus!",
      };
      response.redirect("/artist");
    }
  });
});
route.post("/edit-artist/:id", function (request, response) {
  const id = request.params.id;
  const { artist, career, about } = request.body;
  let oldPhoto = request.body.photo;
  const pathFile = path.join(__dirname + "/../uploads/img/");

  if (request.files) {
    const photo = request.files.photo;
    oldPhoto = Date.now() + photo.name.replace(/\s/g, "");
    const query = `SELECT * FROM tb_artis WHERE id = ${id}`;

    connection.query(query, function (err, results) {
      if (err) throw err;
      fs.unlinkSync(pathFile + results[0].photo);
      photo.mv(pathFile + oldPhoto, function (err) {
        if (err) throw err;
      });
    });
  }

  if (artist === "" || career === "" || about === "") {
    request.session.message = {
      icon: "warning",
      title: "Data wajib diisi semua",
    };
    response.redirect("/artist");
  } else {
    const query = `UPDATE tb_artis SET name = "${artist}", start_career = "${career}", about = "${about}", photo = "${oldPhoto}" WHERE id = ${id}`;

    connection.query(query, function (err, results) {
      if (err) throw err;
      request.session.message = {
        icon: "success",
        title: "Artist berhasil diedit!",
      };
      response.redirect("/artist");
    });
  }
});

// ================================= Route Music =================================
route.get("/music", function (request, response) {
  const title = "Kelola Music";
  const isAdmin = request.session.isAdmin;
  const isLogin = request.session.isLogin;
  const queryMusic = `SELECT tb_music.id, title, music, cover_music, tb_genre.name AS genre_name, tb_artis.name AS artis_name FROM tb_music INNER JOIN tb_genre ON tb_music.genre_id = tb_genre.id INNER JOIN tb_artis ON tb_music.artis_id = tb_artis.id`;
  const queryGenre = `SELECT * FROM tb_genre`;
  const queryArtist = `SELECT * FROM tb_artis`;

  if (isLogin) {
    connection.query(queryMusic, function (err, results) {
      if (err) throw err;
      let notEmpty = false;
      if (results.length !== 0) {
        notEmpty = true;
      }
      let musics = results;
      connection.query(queryGenre, function (err, results) {
        if (err) throw err;
        let genres = results;
        connection.query(queryArtist, function (err, results) {
          if (err) throw err;
          let artists = results;
          response.render("music", {
            title,
            isAdmin,
            isLogin,
            musics,
            genres,
            artists,
            notEmpty,
            isActive: { music: true },
          });
        });
      });
    });
  } else {
    response.redirect("/");
  }
});
route.post("/music", function (request, response) {
  const { title, genre, artist } = request.body;

  // Upload file cover music
  const pathFileCoverMusic = path.join(__dirname + "/../uploads/img/");
  const fileCoverMusic = request.files.cover_music;
  const fileNameCoverMusic = Date.now() + fileCoverMusic.name.replace(/\s/g, "");
  const filePathCoverMusic = pathFileCoverMusic + fileNameCoverMusic;
  fileCoverMusic.mv(filePathCoverMusic, function (err) {
    if (err) throw err;
  });

  // Upload file music
  const pathFileMusic = path.join(__dirname + "/../uploads/music/");
  const fileMusic = request.files.music;
  const fileNameMusic = Date.now() + fileMusic.name.replace(/\s/g, "");
  const filePathMusic = pathFileMusic + fileNameMusic;
  fileMusic.mv(filePathMusic, function (err) {
    if (err) throw err;
  });

  const query = `INSERT INTO tb_music (title, music, cover_music, genre_id, artis_id) VALUES ("${title}", "${fileNameMusic}", "${fileNameCoverMusic}", ${genre}, ${artist})`;

  connection.query(query, function (err, results) {
    if (err) throw err;
    request.session.message = {
      icon: "success",
      title: "Tambah music berhasil!",
    };
    response.redirect("/music");
  });
});
route.get("/delete-music/:id", function (request, response) {
  const id = request.params.id;
  const pathFileCoverMusic = path.join(__dirname + "/../uploads/img/");
  const pathFileMusic = path.join(__dirname + "/../uploads/music/");
  const findMusic = `SELECT music, cover_music FROM tb_music WHERE id = ${id}`;
  const query1 = `DELETE FROM tb_music WHERE id = ${id}`;
  const query2 = `ALTER TABLE tb_music AUTO_INCREMENT = ${id}`;
  const playlistValidate = `SELECT * FROM tb_playlist WHERE music_id = ${id}`;

  connection.query(playlistValidate, function (err, results) {
    if (err) throw err;
    if (results.length === 0) {
      connection.query(findMusic, function (err, results) {
        if (err) throw err;
        const pathCoverMusic = pathFileCoverMusic + results[0].cover_music;
        const pathMusic = pathFileMusic + results[0].music;
        fs.unlinkSync(pathCoverMusic);
        fs.unlinkSync(pathMusic);
        connection.query(query1, function (err, results) {
          if (err) throw err;
          request.session.message = {
            icon: "success",
            title: "Hapus music berhasil!",
          };
          response.redirect("/music");
        });
        connection.query(query2);
      });
    } else {
      request.session.message = {
        icon: "error",
        title: "Data tidak dapat dihapus!",
      };
      response.redirect("/music");
    }
  });
});
route.post("/edit-music/:id", function (request, response) {
  const id = request.params.id;
  const { title, genre, artist } = request.body;
  let reqNameMusic = request.body.music;
  let reqNamePhoto = request.body.cover_music;
  const pathFileMusic = path.join(__dirname + "/../uploads/music/");
  const pathFilePhoto = path.join(__dirname + "/../uploads/img/");

  if (request.files) {
    const music = request.files.music;
    const photo = request.files.cover_music;
    reqNameMusic = Date.now() + pathFileMusic.name.replace(/\s/g, "");
    reqNamePhoto = Date.now() + pathFilePhoto.name.replace(/\s/g, "");
    const query = `SELECT * FROM tb_music WHERE id = ${id}`;

    connection.query(query, function (err, results) {
      if (err) throw err;
      fs.unlinkSync(pathFileMusic + results[0].music);
      fs.unlinkSync(pathFilePhoto + results[0].cover_music);
      music.mv(pathFileMusic + reqNameMusic, function (err) {
        if (err) throw err;
      });
      photo.mv(pathFilePhoto + reqNamePhoto, function (err) {
        if (err) throw err;
      });
    });
  }

  if (title === "" || genre === "" || artist === "") {
    request.session.message = {
      icon: "error",
      title: "Inputan tidak boleh kosong!",
    };
    response.redirect("/music");
  } else {
    const query = `UPDATE tb_music SET title = "${title}", music = "${reqNameMusic}", cover_music = "${reqNamePhoto}", genre_id = ${genre}, artis_id = ${artist} WHERE id = ${id}`;

    connection.query(query, function (err, results) {
      if (err) throw err;
      request.session.message = {
        icon: "success",
        title: "Edit music sukses!",
      };
      response.redirect("/music");
    });
  }
});

// ================================= Route Search =================================
route.post("/search", function (request, response) {
  const search = request.body.search;
  const isLogin = request.session.isLogin;
  const userEmail = request.session.userEmail;
  const isAdmin = request.session.isAdmin;
  const isUser = request.session.isUser;
  const query = `SELECT tb_music.id, title, music, cover_music, tb_genre.name AS genre, tb_artis.name AS artis, tb_artis.photo AS photo FROM tb_music INNER JOIN tb_genre ON tb_music.genre_id = tb_genre.id INNER JOIN tb_artis ON tb_music.artis_id = tb_artis.id WHERE title LIKE "%${search}%"`;

  if (search === "") {
    request.session.message = {
      icon: "error",
      title: "Inputan tidak boleh kosong!",
    };
    response.redirect("/");
  } else {
    connection.query(query, function (err, results) {
      if (err) throw err;
      let musics = results;
      let isEmpty = false;
      if (results.length === 0) {
        isEmpty = true;
      }
      response.render("index", {
        isLogin,
        userEmail,
        isAdmin,
        isUser,
        isEmpty,
        musics,
      });
    });
  }
});

// ================================= Route Playlist =================================
route.get("/playlist", function (request, response) {
  const title = "Kelola Playlist";
  const isLogin = request.session.isLogin;
  const isUser = request.session.isUser;
  const userEmail = request.session.userEmail;
  const user_id = request.session.user_id;
  const query = `SELECT * FROM tb_playlist WHERE user_id = ${user_id}`;

  if (isLogin) {
    connection.query(query, function (err, results) {
      if (err) throw err;
      let notEmpty = false;
      let playlistSet = new Set();
      let onlyName = [];
      for (let i = 0; i < results.length; i++) {
        playlistSet.add(results[i].name);
      }
      for (let i of playlistSet.values()) {
        onlyName.push({
          name: i,
          withoutSpace: i.replace(/\s/g, ""),
        });
      }
      if (results.length !== 0) {
        notEmpty = true;
      }
      response.render("playlist", {
        title,
        isLogin,
        isUser,
        userEmail,
        notEmpty,
        isActive: { playlist: true },
        onlyName,
      });
    });
  } else {
    response.redirect("/");
  }
});
route.post("/add-playlist", function (request, response) {
  const { addPlaylist, musicId } = request.body;
  const userId = request.session.user_id;
  const musicIdInt = parseInt(musicId);
  const songCheck = `SELECT * FROM tb_playlist`;
  const query = `INSERT INTO tb_playlist (name, music_id, user_id) VALUES ("${addPlaylist}", ${musicIdInt}, ${userId})`;

  if (addPlaylist === "") {
    request.session.message = {
      icon: "error",
      title: "Inputan tidak boleh kosong!",
    };
    response.redirect("/");
  } else {
    connection.query(songCheck, function (err, results) {
      if (err) throw err;
      if (results.length === 0) {
        connection.query(query, function (err, results) {
          if (err) throw err;
          request.session.message = {
            icon: "success",
            title: "Tambah playlist berhasil!",
          };
          response.redirect("/");
        });
      } else {
        let nextProcess = false;
        for (let i = 0; i < results.length; i++) {
          if (addPlaylist === results[i].name && musicIdInt === results[i].music_id && userId === results[i].user_id) {
            request.session.message = {
              icon: "error",
              title: "Lagu sudah ada!",
            };
            return response.redirect("/");
          } else {
            nextProcess = true;
          }
        }
        if (nextProcess) {
          connection.query(query, function (err, results) {
            if (err) throw err;
            request.session.message = {
              icon: "success",
              title: "Tambah playlist berhasil!",
            };
            response.redirect("/");
          });
        }
      }
    });
  }
});
route.get("/delete-playlist/:name", function (request, response) {
  const name = request.params.name;
  const user_id = request.session.user_id;
  const query = `DELETE FROM tb_playlist WHERE name = "${name}" AND user_id = ${user_id}`;

  connection.query(query, function (err, results) {
    if (err) throw err;
    request.session.message = {
      icon: "success",
      title: "Hapus playlist berhasil!",
    };
    response.redirect("/playlist");
  });
});
route.post("/edit-playlist/:name", function (request, response) {
  const name = request.params.name;
  const playlist = request.body.playlist;
  const query = `UPDATE tb_playlist SET name = "${playlist}" WHERE name = "${name}"`;

  connection.query(query, function (err, results) {
    if (err) throw err;
    request.session.message = {
      icon: "success",
      title: "Edit playlist berhasil!",
    };
    response.redirect("/playlist");
  });
});
route.get("/playlist/:name", function (request, response) {
  const title = "Detail Playlist";
  const name = request.params.name;
  const isLogin = request.session.isLogin;
  const isUser = request.session.isUser;
  const user_id = request.session.user_id;
  const query = `SELECT tb_playlist.name, music_id, tb_music.id, title, music, cover_music FROM tb_playlist INNER JOIN tb_music ON tb_playlist.music_id = tb_music.id WHERE name = "${name}" AND user_id = ${user_id}`;
  if (isLogin) {
    connection.query(query, function (err, results) {
      if (err) throw err;
      let playlists = results;
      let playlistName = results[0].name;
      response.render("detailPlaylist", {
        title,
        isUser,
        isLogin,
        isActive: { playlist: true },
        playlists,
        playlistName,
      });
    });
  } else {
    response.redirect("/");
  }
});

module.exports = route;
