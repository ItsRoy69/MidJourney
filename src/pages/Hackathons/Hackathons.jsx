import React, { useState, useEffect } from "react";
import Cards from "../../components/Cards/Cards";
import "./Hackathons.css";
import hackathons from './hackathons_data';
import search_icon from "../../assets/icons/search.svg";
import sort_icon from "../../assets/icons/sort.svg";
import { Select, Skeleton, Container, SimpleGrid, Flex } from "@mantine/core";
import { motion } from "framer-motion";

const Hackathons = () => {
  const [search, setSearch] = useState("");


  useEffect(() => {
    console.log(hackathons);
  }, []);

  return (
    <motion.div
      className="hackathon"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="profileedit">
        <h1>Hackathons</h1>
      </div>
      <div className="hackathon-main">
        <div className="header-search">
          <div className="header-searchbox">
            <img src={search_icon} alt="Search" />
            <input type="text" placeholder="Find Hackathons" className="search-inp" onChange={(e) => { setSearch(e.target.value) }} />
          </div>
          <Select
            transition="scale-y"
            placeholder="Sort by"
            data={["Newest First", "Oldest First"]}
            icon={<img src={sort_icon} alt="search" />}
            className="select-sort"            
          />
        </div>

        <div className="hackathons-list">
          {hackathons.filter(hackathon => hackathon.name.toLowerCase().includes(search.toLowerCase()))
          .map((hackathon, idx) => <Cards key={idx} props={hackathon} />)}
        </div>
      </div>
    </motion.div>
  );
};

export default Hackathons;
