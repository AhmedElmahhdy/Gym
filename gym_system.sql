-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2024 at 09:39 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gym_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `NationalId` varchar(20) DEFAULT NULL,
  `PhoneNumber` int(11) DEFAULT NULL,
  `MembershipFrom` date DEFAULT NULL,
  `MembershipTo` date DEFAULT NULL,
  `MembershipCost` decimal(10,2) DEFAULT NULL,
  `Status` enum('Active','Freeze') DEFAULT 'Active',
  `TrainerId` int(11) DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`Id`, `Name`, `NationalId`, `PhoneNumber`, `MembershipFrom`, `MembershipTo`, `MembershipCost`, `Status`, `TrainerId`, `IsDeleted`) VALUES
(14, 'AHMMMMMED', '30200005', 12337, '2024-05-15', '2025-05-15', '3000.00', 'Active', 5, 0),
(15, 'undefined', '30200005', 12, '2024-05-13', '2025-05-13', '3500.00', 'Active', 5, 0),
(16, 'Alaa', '30200005', 123, '2024-05-01', '2024-05-10', '3000.00', 'Active', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `trainers`
--

CREATE TABLE `trainers` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `DurationFrom` date DEFAULT NULL,
  `DurationTo` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trainers`
--

INSERT INTO `trainers` (`Id`, `Name`, `DurationFrom`, `DurationTo`) VALUES
(1, 'Alaa', '2023-05-01', '2025-05-01'),
(5, 'Mohamed', '2023-05-01', '2025-05-01'),
(7, 'ziad', '2023-05-01', '2025-05-01'),
(11, 'khaled', '2024-05-01', '2026-05-01'),
(13, 'Ahmed', '2024-05-01', '2026-05-02'),
(18, 'Ahmedddd', '2024-05-01', '2026-05-02'),
(19, 'Ahmeddddd', '2024-05-01', '2026-05-02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `PhoneNumber` (`PhoneNumber`),
  ADD KEY `TrainerId` (`TrainerId`);

--
-- Indexes for table `trainers`
--
ALTER TABLE `trainers`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `trainers`
--
ALTER TABLE `trainers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`TrainerId`) REFERENCES `trainers` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
