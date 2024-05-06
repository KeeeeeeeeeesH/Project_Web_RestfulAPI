-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: May 06, 2024 at 01:13 PM
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
  `Adm_Phone` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`Adm_Id`, `Adm_Fname`, `Adm_Lname`, `Adm_Username`, `Adm_Password`, `Adm_Email`, `Adm_Phone`) VALUES
(1, 'testadmfname', 'testadnlname', 'admtestuser', 'admtestpass', 'admtest@gmail.com', '0980960857'),
(2, 'testadm2fname', 'testadm2lname', 'testadm2User', 'testadm2Pass', 'testadm2@gmail.com', '0796651134'),
(5, 'testadmFnnn', 'testadmLnnn', 'usradmtest', 'pswadmtest', 'apiadm@gmail.com', '0320354341');

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
(1, 'กีฬา'),
(2, 'การเมือง'),
(4, 'ต่างประเทศ');

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
(1, 1),
(2, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Major`
--

CREATE TABLE `Major` (
  `Major_Id` int NOT NULL,
  `Major_Level` int NOT NULL
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
(1, 'memFtest1', 'memLtest1', 'memUname1', 'memPsword1', 'mem1@email.com', '0987654321', 1),
(2, 'memFtestEdited', 'memLtest2', 'memUname2', 'memPsword2', 'mem2@email.com', '0987654327', 1);

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
(1, 'โอ้มายก้อตโตะ', 'oh my god it\'s ธาตุทอง desu.', '2024-05-04 16:34:24', 1, 1),
(2, 'แง้นๆๆๆๆๆๆๆๆ', 'และนี่คือธาตุทองซาวนด์', '2024-05-04 16:57:50', 2, 2);

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
(1, 1, 4.37),
(1, 2, 3.55),
(2, 1, 4.35);

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
(1, 'momoi.jpg'),
(2, 'testadd.jpg');

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
(1, 1, '2024-05-05 14:43:45'),
(1, 2, '2024-05-06 01:36:48'),
(2, 1, '2024-05-06 01:36:53');

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
(1, 1),
(2, 1),
(2, 2);

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
(1, 'ฟุตบอล', 1),
(2, 'บาสเกตบอล', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Total_Read`
--

CREATE TABLE `Total_Read` (
  `Count_Id` int NOT NULL,
  `News_Id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Total_Read`
--

INSERT INTO `Total_Read` (`Count_Id`, `News_Id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Work_Status`
--

CREATE TABLE `Work_Status` (
  `Status_Id` int NOT NULL,
  `Adm_Status` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Work_Status`
--

INSERT INTO `Work_Status` (`Status_Id`, `Adm_Status`) VALUES
(1, 0),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Work_Status_Detail`
--

CREATE TABLE `Work_Status_Detail` (
  `Adm_Id` int NOT NULL,
  `Status_Id` int NOT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Work_Status_Detail`
--

INSERT INTO `Work_Status_Detail` (`Adm_Id`, `Status_Id`, `Start_Date`, `End_Date`) VALUES
(1, 2, '2024-05-01', NULL),
(2, 1, '2024-04-15', '2024-05-05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`Adm_Id`);

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
  ADD KEY `Cat_Id` (`Cat_Id`);

--
-- Indexes for table `Major`
--
ALTER TABLE `Major`
  ADD PRIMARY KEY (`Major_Id`);

--
-- Indexes for table `Member`
--
ALTER TABLE `Member`
  ADD PRIMARY KEY (`Mem_Id`);

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
  ADD PRIMARY KEY (`Mem_Id`,`News_Id`),
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
  ADD KEY `Cat_Id` (`Cat_Id`);

--
-- Indexes for table `Total_Read`
--
ALTER TABLE `Total_Read`
  ADD PRIMARY KEY (`Count_Id`),
  ADD KEY `News_Id` (`News_Id`);

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
  ADD UNIQUE KEY `Adm_Id` (`Adm_Id`),
  ADD KEY `Status_Id` (`Status_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `Adm_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `Cat_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Major`
--
ALTER TABLE `Major`
  MODIFY `Major_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Member`
--
ALTER TABLE `Member`
  MODIFY `Mem_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `News`
--
ALTER TABLE `News`
  MODIFY `News_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Sub_Category`
--
ALTER TABLE `Sub_Category`
  MODIFY `Sub_Cat_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Total_Read`
--
ALTER TABLE `Total_Read`
  MODIFY `Count_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Work_Status`
--
ALTER TABLE `Work_Status`
  MODIFY `Status_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
