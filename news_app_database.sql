-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 03, 2024 at 02:06 PM
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
-- Database: `news_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `Adm_Id` char(7) NOT NULL,
  `Adm_Fname` varchar(50) DEFAULT NULL,
  `Adm_Lname` varchar(50) DEFAULT NULL,
  `Adm_Username` varchar(20) DEFAULT NULL,
  `Adm_Email` varchar(50) DEFAULT NULL,
  `Adm_Password` varchar(20) DEFAULT NULL,
  `Adm_Phone` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `Cat_Id` char(7) NOT NULL,
  `Cat_Name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Favorite_Category`
--

CREATE TABLE `Favorite_Category` (
  `Mem_Id` char(7) NOT NULL,
  `Cat_Id` char(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Major`
--

CREATE TABLE `Major` (
  `Major_Id` char(2) NOT NULL,
  `Major_Level` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Member`
--

CREATE TABLE `Member` (
  `Mem_Id` char(7) NOT NULL,
  `Mem_Fname` varchar(50) DEFAULT NULL,
  `Mem_Lname` varchar(50) DEFAULT NULL,
  `Mem_Username` varchar(20) DEFAULT NULL,
  `Mem_Email` varchar(50) DEFAULT NULL,
  `Mem_Password` varchar(20) DEFAULT NULL,
  `Mem_Phone` varchar(10) DEFAULT NULL,
  `Mem_Status` char(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `News`
--

CREATE TABLE `News` (
  `News_Id` char(8) NOT NULL,
  `News_Name` varchar(255) DEFAULT NULL,
  `News_Detail` text,
  `Date_Added` timestamp NULL DEFAULT NULL,
  `Cat_Id` char(4) DEFAULT NULL,
  `Major_Id` char(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `News_Rating`
--

CREATE TABLE `News_Rating` (
  `Mem_Id` char(7) NOT NULL,
  `News_Id` char(8) NOT NULL,
  `Rating_Score` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Picture`
--

CREATE TABLE `Picture` (
  `News_Id` char(8) NOT NULL,
  `News_Pic` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Read_History`
--

CREATE TABLE `Read_History` (
  `Read_Id` char(10) NOT NULL,
  `Read_Date` timestamp NULL DEFAULT NULL,
  `Mem_Id` char(7) DEFAULT NULL,
  `News_Id` char(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Read_Later`
--

CREATE TABLE `Read_Later` (
  `Mem_Id` char(7) NOT NULL,
  `News_Id` char(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Sub_Category`
--

CREATE TABLE `Sub_Category` (
  `Sub_Cat_Id` char(7) NOT NULL,
  `Sub_Cat_Name` varchar(50) DEFAULT NULL,
  `Cat_Id` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Total_Read`
--

CREATE TABLE `Total_Read` (
  `News_Id` char(8) NOT NULL,
  `Count_Id` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Work_Status`
--

CREATE TABLE `Work_Status` (
  `Status_Id` int NOT NULL,
  `Adm_Status` int NOT NULL COMMENT '1 = Working 0 = Resign'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Work_Status_Detail`
--

CREATE TABLE `Work_Status_Detail` (
  `Adm_Id` char(7) NOT NULL,
  `Status_Id` int NOT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`Adm_Id`),
  ADD UNIQUE KEY `Adm_Username` (`Adm_Username`),
  ADD UNIQUE KEY `Adm_Email` (`Adm_Email`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`Cat_Id`),
  ADD UNIQUE KEY `Cat_Name` (`Cat_Name`);

--
-- Indexes for table `Favorite_Category`
--
ALTER TABLE `Favorite_Category`
  ADD PRIMARY KEY (`Mem_Id`,`Cat_Id`),
  ADD KEY `Cat_Id` (`Cat_Id`);

--
-- Indexes for table `Major`
--
ALTER TABLE `Major`
  ADD PRIMARY KEY (`Major_Id`),
  ADD UNIQUE KEY `Major_Level` (`Major_Level`);

--
-- Indexes for table `Member`
--
ALTER TABLE `Member`
  ADD PRIMARY KEY (`Mem_Id`),
  ADD UNIQUE KEY `Mem_Username` (`Mem_Username`),
  ADD UNIQUE KEY `Mem_Email` (`Mem_Email`);

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
  ADD KEY `News_Id` (`News_Id`);

--
-- Indexes for table `Picture`
--
ALTER TABLE `Picture`
  ADD PRIMARY KEY (`News_Id`,`News_Pic`);

--
-- Indexes for table `Read_History`
--
ALTER TABLE `Read_History`
  ADD PRIMARY KEY (`Read_Id`),
  ADD KEY `Mem_Id` (`Mem_Id`),
  ADD KEY `News_Id` (`News_Id`);

--
-- Indexes for table `Read_Later`
--
ALTER TABLE `Read_Later`
  ADD PRIMARY KEY (`Mem_Id`,`News_Id`),
  ADD KEY `News_Id` (`News_Id`);

--
-- Indexes for table `Sub_Category`
--
ALTER TABLE `Sub_Category`
  ADD PRIMARY KEY (`Sub_Cat_Id`),
  ADD UNIQUE KEY `Sub_Cat_Name` (`Sub_Cat_Name`),
  ADD KEY `Cat_Id` (`Cat_Id`);

--
-- Indexes for table `Total_Read`
--
ALTER TABLE `Total_Read`
  ADD PRIMARY KEY (`News_Id`,`Count_Id`);

--
-- Indexes for table `Work_Status`
--
ALTER TABLE `Work_Status`
  ADD PRIMARY KEY (`Status_Id`);

--
-- Indexes for table `Work_Status_Detail`
--
ALTER TABLE `Work_Status_Detail`
  ADD PRIMARY KEY (`Adm_Id`,`Status_Id`),
  ADD KEY `Status_Id` (`Status_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Work_Status`
--
ALTER TABLE `Work_Status`
  MODIFY `Status_Id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Favorite_Category`
--
ALTER TABLE `Favorite_Category`
  ADD CONSTRAINT `Favorite_Category_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `Member` (`Mem_Id`),
  ADD CONSTRAINT `Favorite_Category_ibfk_2` FOREIGN KEY (`Cat_Id`) REFERENCES `Category` (`Cat_Id`);

--
-- Constraints for table `News`
--
ALTER TABLE `News`
  ADD CONSTRAINT `News_ibfk_1` FOREIGN KEY (`Cat_Id`) REFERENCES `Category` (`Cat_Id`),
  ADD CONSTRAINT `News_ibfk_2` FOREIGN KEY (`Major_Id`) REFERENCES `Major` (`Major_Id`);

--
-- Constraints for table `News_Rating`
--
ALTER TABLE `News_Rating`
  ADD CONSTRAINT `News_Rating_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `Member` (`Mem_Id`),
  ADD CONSTRAINT `News_Rating_ibfk_2` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`);

--
-- Constraints for table `Picture`
--
ALTER TABLE `Picture`
  ADD CONSTRAINT `Picture_ibfk_1` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`);

--
-- Constraints for table `Read_History`
--
ALTER TABLE `Read_History`
  ADD CONSTRAINT `Read_History_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `Member` (`Mem_Id`),
  ADD CONSTRAINT `Read_History_ibfk_2` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`);

--
-- Constraints for table `Read_Later`
--
ALTER TABLE `Read_Later`
  ADD CONSTRAINT `Read_Later_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `Member` (`Mem_Id`),
  ADD CONSTRAINT `Read_Later_ibfk_2` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`);

--
-- Constraints for table `Sub_Category`
--
ALTER TABLE `Sub_Category`
  ADD CONSTRAINT `Sub_Category_ibfk_1` FOREIGN KEY (`Cat_Id`) REFERENCES `Category` (`Cat_Id`);

--
-- Constraints for table `Total_Read`
--
ALTER TABLE `Total_Read`
  ADD CONSTRAINT `Total_Read_ibfk_1` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`);

--
-- Constraints for table `Work_Status_Detail`
--
ALTER TABLE `Work_Status_Detail`
  ADD CONSTRAINT `Work_Status_Detail_ibfk_1` FOREIGN KEY (`Adm_Id`) REFERENCES `Admin` (`Adm_Id`),
  ADD CONSTRAINT `Work_Status_Detail_ibfk_2` FOREIGN KEY (`Status_Id`) REFERENCES `Work_Status` (`Status_Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
