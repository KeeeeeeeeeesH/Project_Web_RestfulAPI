-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: May 12, 2024 at 02:23 PM
-- Server version: 8.4.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `news_web_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `Adm_Id` int NOT NULL,
  `Adm_Fname` varchar(50) NOT NULL,
  `Adm_Lname` varchar(50) NOT NULL,
  `Adm_Username` varchar(20) NOT NULL,
  `Adm_Password` varchar(20) NOT NULL,
  `Adm_Email` varchar(50) NOT NULL,
  `Adm_Phone` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`Adm_Id`, `Adm_Fname`, `Adm_Lname`, `Adm_Username`, `Adm_Password`, `Adm_Email`, `Adm_Phone`) VALUES
(16, 'aasdad', 'qdqwdqd', 'abcd', '1234', 'abcd@gmail.com', '0980960857'),
(27, 'aasdad', 'qdqwdqd', 'abcdefg', '123456', 'abcdef@gmail.com', '0987654321');

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `Cat_Id` int NOT NULL,
  `Cat_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`Cat_Id`, `Cat_Name`) VALUES
(6, 'กีฬา'),
(7, 'การเมือง'),
(8, 'เศรษฐกิจ'),
(9, 'สุขภาพ'),
(10, 'เกมส์');

-- --------------------------------------------------------

--
-- Table structure for table `Favorite_Category`
--

CREATE TABLE `Favorite_Category` (
  `Mem_Id` int NOT NULL,
  `Cat_Id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Favorite_Category`
--

INSERT INTO `Favorite_Category` (`Mem_Id`, `Cat_Id`) VALUES
(5, 6),
(5, 7),
(7, 8),
(7, 10);

-- --------------------------------------------------------

--
-- Table structure for table `Major`
--

CREATE TABLE `Major` (
  `Major_Id` int NOT NULL,
  `Major_Level` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Major`
--

INSERT INTO `Major` (`Major_Id`, `Major_Level`) VALUES
(1, 0),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Member`
--

CREATE TABLE `Member` (
  `Mem_Id` int NOT NULL,
  `Mem_Fname` varchar(50) NOT NULL,
  `Mem_Lname` varchar(50) NOT NULL,
  `Mem_Username` varchar(20) NOT NULL,
  `Mem_Password` varchar(20) NOT NULL,
  `Mem_Email` varchar(50) NOT NULL,
  `Mem_Phone` char(10) NOT NULL,
  `Mem_Status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Member`
--

INSERT INTO `Member` (`Mem_Id`, `Mem_Fname`, `Mem_Lname`, `Mem_Username`, `Mem_Password`, `Mem_Email`, `Mem_Phone`, `Mem_Status`) VALUES
(5, 'memFTest', 'memLTest', 'memUserTest', 'memPassTest', 'memTest@gmail.com', '0980960857', 1),
(7, 'TestFmem2', 'TestLmem2', 'TestUmem2', 'TestPmem2', 'Testmem2@gmail.com', '0987654321', 1);

-- --------------------------------------------------------

--
-- Table structure for table `News`
--

CREATE TABLE `News` (
  `News_Id` int NOT NULL,
  `News_Name` varchar(255) NOT NULL,
  `News_Details` text NOT NULL,
  `Date_Added` timestamp NOT NULL,
  `Cat_Id` int NOT NULL,
  `Major_Id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `News`
--

INSERT INTO `News` (`News_Id`, `News_Name`, `News_Details`, `Date_Added`, `Cat_Id`, `Major_Id`) VALUES
(10, 'ทดสอบกีฬา', 'ทดสอบข่าวกีฬา ฟุตบอล', '2024-05-12 13:49:49', 6, 1),
(12, 'ทดสอบ 2', 'ทดสอบข่าวที่ 2', '2024-05-12 14:10:50', 8, 1),
(13, 'ทดสอบ 3', 'ทดสอบข่าวที่ 3', '2024-05-12 14:11:11', 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `News_Rating`
--

CREATE TABLE `News_Rating` (
  `Mem_Id` int NOT NULL,
  `News_Id` int NOT NULL,
  `Rating_Score` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `News_Rating`
--

INSERT INTO `News_Rating` (`Mem_Id`, `News_Id`, `Rating_Score`) VALUES
(5, 10, 4.55),
(7, 12, 3.99),
(7, 13, 4.88);

-- --------------------------------------------------------

--
-- Table structure for table `Picture`
--

CREATE TABLE `Picture` (
  `News_Id` int NOT NULL,
  `News_Pic` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Picture`
--

INSERT INTO `Picture` (`News_Id`, `News_Pic`) VALUES
(10, 'football1.jpg'),
(10, 'football2.jpg'),
(12, 'economy1.jpg'),
(12, 'economy2.png'),
(13, 'game1'),
(13, 'game2.png');

-- --------------------------------------------------------

--
-- Table structure for table `Read_History`
--

CREATE TABLE `Read_History` (
  `Mem_Id` int NOT NULL,
  `News_Id` int NOT NULL,
  `Read_Date` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Read_History`
--

INSERT INTO `Read_History` (`Mem_Id`, `News_Id`, `Read_Date`) VALUES
(5, 10, '2024-05-12 13:53:52'),
(7, 12, '2024-05-12 14:22:14'),
(7, 13, '2024-05-12 14:22:20');

-- --------------------------------------------------------

--
-- Table structure for table `Read_Later`
--

CREATE TABLE `Read_Later` (
  `Mem_Id` int NOT NULL,
  `News_Id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Read_Later`
--

INSERT INTO `Read_Later` (`Mem_Id`, `News_Id`) VALUES
(5, 10),
(7, 13);

-- --------------------------------------------------------

--
-- Table structure for table `Sub_Category`
--

CREATE TABLE `Sub_Category` (
  `Sub_Cat_Id` int NOT NULL,
  `Sub_Cat_Name` varchar(50) NOT NULL,
  `Cat_Id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Sub_Category`
--

INSERT INTO `Sub_Category` (`Sub_Cat_Id`, `Sub_Cat_Name`, `Cat_Id`) VALUES
(6, 'ฟุตบอล', 6),
(7, 'วอเล่ย์บอล', 6),
(8, 'วัยรุ่น', 9),
(9, 'เด็ก', 9),
(10, 'ผู้สูงอายุ', 9),
(11, 'TFT', 10),
(12, 'LOL', 10),
(13, 'DOTA2', 10);

-- --------------------------------------------------------

--
-- Table structure for table `Total_Read`
--

CREATE TABLE `Total_Read` (
  `Count_Id` int NOT NULL,
  `News_Id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Total_Read`
--

INSERT INTO `Total_Read` (`Count_Id`, `News_Id`) VALUES
(11, NULL),
(12, NULL),
(13, NULL),
(8, 10),
(9, 10),
(10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `Work_Status`
--

CREATE TABLE `Work_Status` (
  `Adm_Id` int NOT NULL,
  `Adm_Status` int NOT NULL DEFAULT '1',
  `Start_Date` date NOT NULL,
  `End_Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Work_Status`
--

INSERT INTO `Work_Status` (`Adm_Id`, `Adm_Status`, `Start_Date`, `End_Date`) VALUES
(16, 1, '2024-05-09', NULL),
(27, 1, '2024-05-11', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`Adm_Id`),
  ADD UNIQUE KEY `Adm_Username` (`Adm_Username`),
  ADD UNIQUE KEY `Adm_Email` (`Adm_Email`),
  ADD UNIQUE KEY `Adm_Phone` (`Adm_Phone`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`Cat_Id`);

--
-- Indexes for table `Favorite_Category`
--
ALTER TABLE `Favorite_Category`
  ADD PRIMARY KEY (`Mem_Id`,`Cat_Id`),
  ADD KEY `Favorite_Category_ibfk_2` (`Cat_Id`);

--
-- Indexes for table `Major`
--
ALTER TABLE `Major`
  ADD PRIMARY KEY (`Major_Id`);

--
-- Indexes for table `Member`
--
ALTER TABLE `Member`
  ADD PRIMARY KEY (`Mem_Id`),
  ADD UNIQUE KEY `Mem_Username` (`Mem_Username`),
  ADD UNIQUE KEY `Mem_Email` (`Mem_Email`),
  ADD UNIQUE KEY `Mem_Phone` (`Mem_Phone`);

--
-- Indexes for table `News`
--
ALTER TABLE `News`
  ADD PRIMARY KEY (`News_Id`),
  ADD KEY `Cat_Id` (`Cat_Id`),
  ADD KEY `Major_Id` (`Major_Id`);

--
-- Indexes for table `News_Rating`
--
ALTER TABLE `News_Rating`
  ADD PRIMARY KEY (`Mem_Id`,`News_Id`),
  ADD KEY `News_Rating_ibfk_2` (`News_Id`);

--
-- Indexes for table `Picture`
--
ALTER TABLE `Picture`
  ADD PRIMARY KEY (`News_Id`,`News_Pic`);

--
-- Indexes for table `Read_History`
--
ALTER TABLE `Read_History`
  ADD PRIMARY KEY (`Mem_Id`,`News_Id`),
  ADD KEY `Read_History_ibfk_2` (`News_Id`);

--
-- Indexes for table `Read_Later`
--
ALTER TABLE `Read_Later`
  ADD PRIMARY KEY (`Mem_Id`,`News_Id`),
  ADD KEY `Read_Later_ibfk_2` (`News_Id`);

--
-- Indexes for table `Sub_Category`
--
ALTER TABLE `Sub_Category`
  ADD PRIMARY KEY (`Sub_Cat_Id`),
  ADD KEY `Sub_Category_ibfk_1` (`Cat_Id`);

--
-- Indexes for table `Total_Read`
--
ALTER TABLE `Total_Read`
  ADD PRIMARY KEY (`Count_Id`),
  ADD KEY `Total_Read_ibfk_1` (`News_Id`);

--
-- Indexes for table `Work_Status`
--
ALTER TABLE `Work_Status`
  ADD PRIMARY KEY (`Adm_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `Adm_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `Cat_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Major`
--
ALTER TABLE `Major`
  MODIFY `Major_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Member`
--
ALTER TABLE `Member`
  MODIFY `Mem_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `News`
--
ALTER TABLE `News`
  MODIFY `News_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `Sub_Category`
--
ALTER TABLE `Sub_Category`
  MODIFY `Sub_Cat_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `Total_Read`
--
ALTER TABLE `Total_Read`
  MODIFY `Count_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Favorite_Category`
--
ALTER TABLE `Favorite_Category`
  ADD CONSTRAINT `Favorite_Category_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `Member` (`Mem_Id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `Favorite_Category_ibfk_2` FOREIGN KEY (`Cat_Id`) REFERENCES `Category` (`Cat_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `News`
--
ALTER TABLE `News`
  ADD CONSTRAINT `News_ibfk_1` FOREIGN KEY (`Cat_Id`) REFERENCES `Category` (`Cat_Id`),
  ADD CONSTRAINT `News_ibfk_2` FOREIGN KEY (`Major_Id`) REFERENCES `Major` (`Major_Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `News_Rating`
--
ALTER TABLE `News_Rating`
  ADD CONSTRAINT `News_Rating_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `Member` (`Mem_Id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `News_Rating_ibfk_2` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `Picture`
--
ALTER TABLE `Picture`
  ADD CONSTRAINT `Picture_ibfk_1` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `Read_History`
--
ALTER TABLE `Read_History`
  ADD CONSTRAINT `Read_History_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `Member` (`Mem_Id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `Read_History_ibfk_2` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `Read_Later`
--
ALTER TABLE `Read_Later`
  ADD CONSTRAINT `Read_Later_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `Member` (`Mem_Id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `Read_Later_ibfk_2` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `Sub_Category`
--
ALTER TABLE `Sub_Category`
  ADD CONSTRAINT `Sub_Category_ibfk_1` FOREIGN KEY (`Cat_Id`) REFERENCES `Category` (`Cat_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `Total_Read`
--
ALTER TABLE `Total_Read`
  ADD CONSTRAINT `Total_Read_ibfk_1` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`) ON DELETE SET NULL ON UPDATE RESTRICT;

--
-- Constraints for table `Work_Status`
--
ALTER TABLE `Work_Status`
  ADD CONSTRAINT `Work_Status_ibfk_1` FOREIGN KEY (`Adm_Id`) REFERENCES `Admin` (`Adm_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
