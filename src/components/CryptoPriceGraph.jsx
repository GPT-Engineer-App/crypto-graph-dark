import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, useColorMode } from '@chakra-ui/react';

const CryptoPriceGraph = () => {
  const [data, setData] = useState([]);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1');
        const result = await response.json();
        const formattedData = result.data.map(item => ({
          date: new Date(item.time).toLocaleDateString(),
          price: parseFloat(item.priceUsd),
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box width="100%" height="80vh" bg={colorMode === 'dark' ? 'gray.800' : 'white'} p={4} borderRadius="md" boxShadow="lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke={colorMode === 'dark' ? 'white' : 'black'} />
          <YAxis stroke={colorMode === 'dark' ? 'white' : 'black'} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CryptoPriceGraph;