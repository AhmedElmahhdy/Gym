import connection from "../../../DB/dbconnection.js"



export const add_trainer = async(req,res)=>{
    const data = req.body 
    const query = ` select * from trainers where Name = '${data.Name}' `
   connection.execute(query,(err,result)=>{
      if (err){
        return res.json("query error")
      }
     if (result.length == 0){
      //  return res.json("Trainer is already Exist")
      connection.execute(`insert into trainers (Name,DurationFrom,DurationTo) values('${data.Name}','${data.DurationFrom}','${data.DurationTo}')`,
      (err,result)=>{
          if (err){
            return res.json("insert query error")
          }
      },
      )
      return res.json("Trainer added sucessfull ") 
     }
     res.json("Trainer is already Exist") 
    })
   




  
  
}

export const get_alltrainers_and_TrainersMember = (req,res)=>{
    const querey = `SELECT 
                    trainers.Id AS TrainerId,
                    trainers.Name AS TrainerName,
                    members.Id AS MemberId,
                    members.Name AS MemberName

   FROM trainers LEFT JOIN members ON trainers.Id = members.TrainerId;`
    connection.execute(querey,(err,result)=>{
        if(err) throw(err)
        res.json(result)
    })
} 

export const update_trainer = (req,res)=>{
    const data = req.body
    const update_trainer_query = `UPDATE trainers 
                              SET Name = '${data.Name}',
                                  DurationFrom = '${data.DurationFrom}',
                                  DurationTo = '${data.DurationTo}' 
                              WHERE Name = '${data.oldname}'`;

    connection.execute(update_trainer_query,(err)=>{
        if (err){
            return res.status(500).json({ error: 'Failed to update trainer' });
        }
        res.json("trainer is updated sucsseful ")

    })

}

export const delete_trainer = (req,res)=>{
    const data = req.body
    const checkTrainerQuery = `SELECT * FROM trainers WHERE Name = '${data.Name}' `;
  connection.query(checkTrainerQuery, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    const deleteQuery = `DELETE FROM trainers WHERE Name = '${data.Name}'`;
    connection.query(deleteQuery,  (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to delete trainer' });
      }
      return res.status(200).json({ message: 'Trainer deleted successfully' });
    });
  });
}

export const get_specific_trainer_byName = (req,res)=>{
  const data = req.body 
  const query = ` SELECT 
         trainers.Id AS TrainerId,
         trainers.Name AS TrainerName,
          members.Id AS MemberId,
         members.Name AS MemberName
      FROM 
          trainers 
      LEFT JOIN 
          members 
      ON 
          members.TrainerId = trainers.Id 
      WHERE trainers.Name = '${data.Name}'
         `
    connection.execute(query, (err, result) => {
    if (err) {
      throw (err); // return res.json("query error : ",err.message)
    }
    if (result.length == 0) {
      return res.json("Trainer is not Exist ");
    }
    res.json(result);

  })  

   
  }

export const get_revenues = (req,res)=>{
  const data= req.body 
  const query = `SELECT SUM(MembershipCost) AS TotalRevenue from members 
  right join trainers
  on trainers.Id = members.TrainerId
  where
  trainers.Name = '${data.Name}'
  `
  connection.execute(query,(err,result)=>{
    if(err){
      throw(err)
     //return  res.json("Query Error")
    }
    if(result.length == 0){
      return res.json("Trainer is not Exsit")
    }
    res.json(result)
  })
}
  