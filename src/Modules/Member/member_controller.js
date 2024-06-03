import connection from "../../../DB/dbconnection.js";
connection

// Get Specific Member
export const Get_specific_Member_ByPhoneNumber = (req,res)=>{
    const data = req.body
    const querey = `SELECT * FROM members WHERE PhoneNumber  = '${data.Phone_Number}'  `
    connection.execute(querey,(err,result)=>{
        if (err){
          return res.json({ err: 'Query error' });
        }
        if (result.length == 0){
           return res.json("Member is not Exist")
        }
        console.log(result);
        const member = result[0]; 
        console.log(member);
        const currentDate = new Date();
        const membershipTo = new Date(member.MembershipTo);
    
        if (currentDate > membershipTo) {
          return res.json({ error: 'This member is not allowed to enter the gym. Membership expired.' });
        }
    
        return res.json({member});
    }) 
}

export const add_member = (req,res)=>{  
    const data = req.body 
    const get_query = ` select * from members where PhoneNumber = "${data.PhoneNumber}"`
    connection.execute(get_query,(err,result)=>{
        if (err){
            return res.json("query error")
        }
        if(result.length == 0){
          connection.execute(`insert into members (Name,NationalId,PhoneNumber,MembershipFrom,MembershipTo,MembershipCost,Status,TrainerId )
          values('${data.Name}','${data.NationalId}','${data.PhoneNumber}','${data.MembershipFrom}','${data.MembershipTo}','${data.MembershipCost}','${data.Status}','${data.TrainerId }')`,
          (err)=>{
          if (err) throw(err)  
        }, 
        )
        return res.json("Member added sucess ") 
        }

        res.json("member is already Exist") 
    })
     
  
  
}

export const get_allMembers_and_MembersTrainer = (req,res)=>{
    const querey = `SELECT 
                    members.Id AS MemberId,
                    members.Name AS MemberName,
                    trainers.Id AS TrainerId,
                    trainers.Name AS TrainerName

   FROM trainers LEFT JOIN members ON trainers.Id = members.TrainerId;`
    connection.execute(querey,(err,result)=>{
        if(err){
            return res.json("query error ")
        }
        res.json(result)
    })
} 

export const update_member = (req,res)=>{
    const data = req.body
    const update_member_query = `UPDATE members 
                              SET Name = '${data.Name}', 
                                  MembershipFrom = '${data.MembershipFrom}', 
                                  MembershipTo = '${data.MembershipTo}',
                                  MembershipCost = '${data.MembershipCost}',
                                  TrainerId = '${data.TrainerId}'
                              WHERE PhoneNumber = '${data.PhoneNumber}'`;

    connection.execute(update_member_query,(err)=>{
        if (err){
          return res.status(500).json({ error: 'Failed to update member' });
        }
        res.json("member is updated sucsseful ")

    })

}

export const delete_member = (req,res)=>{
    const data = req.body
    const updateQuery = `UPDATE members SET IsDeleted = 1 WHERE PhoneNumber = '${data.PhoneNumber}'`;
    connection.query(updateQuery, (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to delete member' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Member not found' });
      }
      return res.status(200).json({ message: 'Member soft deleted successfully' });
    });
}

export const get_revenues = (req,res)=>{
  const totalRevenueQuery = `
  SELECT SUM(MembershipCost) AS TotalRevenue
  FROM members
`;

connection.query(totalRevenueQuery, (error, results) => {
  if (error) {
    return res.status(500).json({ error: 'Database error' });
  }

  const totalRevenue = results[0].TotalRevenue || 0; // If no revenue, default to 0
  return res.status(200).json({ totalRevenue });
});
}