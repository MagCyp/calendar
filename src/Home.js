import React from "react";
import style from "./App.module.scss";
import { Button, Grid, styled, Container } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Home() {
  return (
    <div className={style.mainDiv}>
      <Container
        maxWidth="lg"
        sx={{
          pl: 0,
          pr: 0,
          pt: 0,
          mt: 0,
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0px -5px 10px 5px rgba(0, 0, 0, 0.5)",
          margin: "20vh auto 0",
        }}
      >
        <Grid container spacing={2} sx={{ pt: 3, pl: 10, pr: 5 }}>
          <Grid item xs={8}>
            Nails play a vital role in construction and carpentry, allowing
            materials to be fastened together securely. They are available in
            different shapes and sizes, with steel being the most common type of
            nail. Nail care is an essential part of personal grooming and a
            healthy lifestyle. Regular clipping, filing, and polishing of nails
            can prevent fungal infections and other issues. Nail salons offer
            professional nail care services, including manicures and pedicures,
            providing a relaxing and enjoyable experience. Overall, nails are a
            small but significant aspect of our daily lives.
            <Grid
              item
              xs={20}
              display="flex"
              justifyContent="center"
              sx={{ padding: "20px" }}
            >
              <Button
                variant="outlined"
                sx={{
                  background: "black",
                  borderRadius: "20px",
                  color: "white",
                }}
              >
                Register me
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Img
              src="https://cdn-icons-png.flaticon.com/512/1088/1088537.png"
              alt="1"
              sx={{ height: 150, pt: 0 }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
