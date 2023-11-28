function Temp({updatedAt}){
 let date=new Date(updatedAt).getHours()-12 + ":" + new Date(updatedAt).getMinutes() + " "+"PM"
    console.log(date);

    return(
        <div >
            <p>{date}</p>
          </div>
    )
}
export default Temp