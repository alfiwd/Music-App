-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 20 Sep 2021 pada 14.02
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_music`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_artis`
--

CREATE TABLE `tb_artis` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `start_career` date NOT NULL,
  `photo` varchar(255) NOT NULL,
  `about` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT curtime(),
  `update_at` timestamp NOT NULL DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_artis`
--

INSERT INTO `tb_artis` (`id`, `name`, `start_career`, `photo`, `about`, `created_at`, `update_at`) VALUES
(1, 'Metallica', '2021-09-01', '1631862785251metallicaaclfestival2018octpromo_6381.jpg', 'Metallica adalah sebuah band asal Amerika Serikat yang didirikan pertama kali di Los Angeles dengan nama The Young of Metal Attack. Beberapa bulan kemudian grup ini berganti nama dengan Metallica yang konon merupakan gabungan kata Metal dan Vodca. Nama Me', '2021-09-17 07:10:35', '2021-09-17 07:10:35'),
(2, 'Avenged Sevenfold', '2021-09-02', '1631862763255avengedsevenfold.jpg', 'Avenged Sevenfold (sering juga ditulis A7X) adalah grup musik Heavy Metal Amerika Serikat yang dibentuk pada tahun 1999. Grup musik ini berasal dari Huntington Beach, California. Anggota Avenged Sevenfold pada saat ini terdiri dari M. Shadows, Synyster Ga', '2021-09-17 07:12:43', '2021-09-17 07:12:43'),
(3, 'Black Veil Brides', '2021-09-03', '1631899192285blackveilbrides.jpg', 'Black Veil Brides is an American rock band based in Hollywood, California. The group formed in 2006 in Cincinnati, Ohio and is currently composed of lead vocalist Andy Biersack, rhythm guitarist and violinist Jinxx, lead guitarist Jake Pitts, drummer Chri', '2021-09-17 17:19:52', '2021-09-17 17:19:52'),
(4, 'Linkin Park', '2021-09-04', '1631944050705linkinpark.jpg', 'Linkin Park adalah grup musik rock yang berasal dari Agoura Hills, California, Amerika Serikat. Saat ini band ini digawangi Mike Shinoda selaku vokalis/multi-instrumentalis, Brad Delson sebagai gitaris, Dave Farrell sebagai bassis, Joe Hahn sebagai DJ/pem', '2021-09-18 05:47:30', '2021-09-18 05:47:30'),
(5, 'Slipknot', '2021-09-05', '1631947976046slipknot.jpg', 'Slipknot adalah sebuah band beraliran Nu Metal dari Des Moines, Iowa yang dibentuk pada bulan September 1995.\r\n\r\nBand ini dibentuk oleh sang pemain perkusi Shawn Crahan dan sang pemain bass Paul Gray. Setelah beberapa kali mengganti anggotanya, band ini m', '2021-09-18 06:52:56', '2021-09-18 06:52:56'),
(6, 'Trivium', '2021-09-06', '1632106947277triviumband.jpg', 'Trivium adalah sebuah band heavy metal dari Orlando, Florida, Amerika yang terbentuk pada tahun 1999. Di bawah perusahaan rekaman Roadrunner Records, mereka telah merilis empat album, sebelas singles dan duabelas video musik. Album ketujuh mereka, The Sin', '2021-09-20 03:02:27', '2021-09-20 03:02:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_genre`
--

CREATE TABLE `tb_genre` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT curtime(),
  `update_at` timestamp NOT NULL DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_genre`
--

INSERT INTO `tb_genre` (`id`, `name`, `created_at`, `update_at`) VALUES
(1, 'Heavy Metal', '2021-09-17 07:07:44', '2021-09-17 07:07:44'),
(2, 'Rock', '2021-09-17 07:07:52', '2021-09-17 07:07:52'),
(3, 'Trash Metal', '2021-09-17 07:08:00', '2021-09-17 07:08:00'),
(4, 'Death Metal', '2021-09-20 02:57:50', '2021-09-20 02:57:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_music`
--

CREATE TABLE `tb_music` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `music` varchar(255) NOT NULL,
  `cover_music` varchar(255) NOT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `artis_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT curtime(),
  `update_at` timestamp NOT NULL DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_music`
--

INSERT INTO `tb_music` (`id`, `title`, `music`, `cover_music`, `genre_id`, `artis_id`, `created_at`, `update_at`) VALUES
(1, 'Now That We\'re Dead', '1631902586384metallica-nowthatwe\'redead.mp3', '163190258638361bsNIfrp0L._SL1200_.jpg', 1, 1, '2021-09-17 18:16:26', '2021-09-17 18:16:26'),
(2, 'Knives and Pens', '1631910468127bvb-knivesandpens.mp3', '1631910468126bvb-knivesandpens.jpg', 1, 3, '2021-09-17 20:27:48', '2021-09-17 20:27:48'),
(3, 'Almost Easy', '1631890431994a7x-almosteasy.mp3', '1631890431993Avenged_Sevenfold_cover_2007.jpg', 1, 2, '2021-09-17 14:53:52', '2021-09-17 14:53:52'),
(4, 'From The Inside', '163194408152610LinkinPark-FromTheInside.mp3', '1631944081526linkinpark-fromtheinside.webp', 2, 4, '2021-09-18 05:48:01', '2021-09-18 05:48:01'),
(5, 'Duality', '1631971373285Slipknot-DualityHQ.mp3', '1631971373283slipknot-duality.jpg', 3, 5, '2021-09-18 13:22:53', '2021-09-18 13:22:53'),
(6, 'Until The World Goes Cold', '1632137250428Trivium-UntilTheWorldGoesCold.mp3', '1632137250427trivium-untiltheworldgoescold.jpg', 1, 6, '2021-09-20 11:27:30', '2021-09-20 11:27:30');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_playlist`
--

CREATE TABLE `tb_playlist` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `music_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT curtime(),
  `update_at` timestamp NOT NULL DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_playlist`
--

INSERT INTO `tb_playlist` (`id`, `name`, `music_id`, `user_id`, `created_at`, `update_at`) VALUES
(1, 'Heavy Metal', 1, 2, '2021-09-20 11:49:59', '2021-09-20 11:49:59'),
(2, 'Heavy Metal', 3, 2, '2021-09-20 11:50:14', '2021-09-20 11:50:14'),
(3, 'Trash Metal', 5, 2, '2021-09-20 11:50:49', '2021-09-20 11:50:49'),
(4, 'Rock', 4, 3, '2021-09-20 11:52:02', '2021-09-20 11:52:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `status` int(2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT curtime(),
  `update_at` timestamp NOT NULL DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_user`
--

INSERT INTO `tb_user` (`id`, `email`, `password`, `status`, `created_at`, `update_at`) VALUES
(1, 'admin@gmail.com', 'admin', 1, '2021-08-11 03:50:44', '2021-08-02 03:50:58'),
(2, 'user01@gmail.com', '123', 2, '2021-09-17 16:19:20', '2021-09-17 16:19:20'),
(3, 'user02@gmail.com', '123', 2, '2021-09-19 08:33:08', '2021-09-19 08:33:08');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tb_artis`
--
ALTER TABLE `tb_artis`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_genre`
--
ALTER TABLE `tb_genre`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_music`
--
ALTER TABLE `tb_music`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_id` (`genre_id`),
  ADD KEY `artis_id` (`artis_id`);

--
-- Indeks untuk tabel `tb_playlist`
--
ALTER TABLE `tb_playlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `music_id` (`music_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tb_artis`
--
ALTER TABLE `tb_artis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `tb_genre`
--
ALTER TABLE `tb_genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `tb_music`
--
ALTER TABLE `tb_music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `tb_playlist`
--
ALTER TABLE `tb_playlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tb_music`
--
ALTER TABLE `tb_music`
  ADD CONSTRAINT `tb_music_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `tb_genre` (`id`),
  ADD CONSTRAINT `tb_music_ibfk_2` FOREIGN KEY (`artis_id`) REFERENCES `tb_artis` (`id`);

--
-- Ketidakleluasaan untuk tabel `tb_playlist`
--
ALTER TABLE `tb_playlist`
  ADD CONSTRAINT `tb_playlist_ibfk_1` FOREIGN KEY (`music_id`) REFERENCES `tb_music` (`id`),
  ADD CONSTRAINT `tb_playlist_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
