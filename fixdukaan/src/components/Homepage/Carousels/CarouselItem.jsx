import { Paper } from '@mui/material'

function CarouselItem({ item }) {
    return (
        <Paper>
            <div style={{display:"flex",width:"100%",flexDirection:"column"}}>
                <img src={item.URL} alt={item.description} style={{ width: "300px", height: "300px" ,margin:"auto",padding:"20px"}} />
            </div>
        </Paper>
    )
}
export default CarouselItem 