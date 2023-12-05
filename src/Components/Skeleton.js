import React from 'react'
import Skeleton from "@mui/material/Skeleton";
const Skeletons = (props) => {
  return (
    <>
    <div className={""+(props.cls)}
          style={{
            border: "20px",
            padding: "10px",
           
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", borderRadius: "10px" }}
            height={60}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              borderRadius: "10px",
              flexGrow: "1",
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", borderRadius: "10px" }}
            height={60}
          />
        </div></>
  )
}

export default Skeletons