const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();
const port = 3010;
app.use(express.static('static'));
app.use(express.json()); 

const rawData = fs.readFileSync('data.json');
const studentsData = JSON.parse(rawData);



app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

app.post('/students/above-threshold',async(req,res)=>{
  
  try{
  const {threshold} = req.body;
  
  if (typeof threshold !== 'number') {
    return res.status(400).json({
      message: 'Invalid threshold. Please provide valid value in number.'
    });
  }

    const filteredStudents = studentsData
      .filter(student => student.total > threshold)
      .map(student => ({ name: student.name, total: student.total }));

    return res.json({
      count: filteredStudents.length,
      students: filteredStudents
    });
}
  catch(error){

    return res.status(500).json({error:"An Error Has Occured!"})
  }

})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});