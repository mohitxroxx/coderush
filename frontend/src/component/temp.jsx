function Temp({updatedAt}){
    let x=new Date(updatedAt).getMinutes();
    if((new Date(updatedAt).getMinutes())<10){
x="0"+new Date(updatedAt).getMinutes()
    }
 let date=new Date(updatedAt).getHours()-12 + ":" + x + " "+"PM"
    console.log(date);

    return(
        <div >
            <p>{date}</p>
          </div>
    )
}
export default Temp