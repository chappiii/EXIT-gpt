import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";
import Header from "../components/Header";
import modelImg from "../assets/model.png";
import pdf from "../assets/pdf.png";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Header />
      <Box width={"100%"} height={"100%"}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            mx: "auto",
            mt: 3,
          }}
        >
          <Box>
            <TypingAnim />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { md: "row", xs: "column", sm: "column" },
              gap: 5,
              my: 10,
            }}
          >
            <img
              src="moe.png"
              alt="moe"
              style={{ width: "200px", margin: "auto" }}
            />
            <img
              className="image-inverted rotate"
              src="openai.png"
              alt="openai"
              style={{ width: "200px", margin: "auto" }}
            />
          </Box>
          <Box sx={{ display: "flex", mx: "auto", paddingBottom: "15px" }}>
            <img
              src="Ethiopia-Education-Ministry.webp"
              alt="exit"
              style={{
                display: "flex",
                margin: "auto",
                width: isBelowMd ? "80%" : "60%",
                marginTop: 20,
                marginBottom: 20,
                padding: 10,
              }}
            />
          </Box>
        </Box>
        {/* <img
          src={modelImg}
          alt=""
          className="border-2 border-gray-300 shadow-lg"
        />
        <img src={pdf} alt="" className="border-2 border-gray-300 shadow-lg" /> */}
        <Footer />
      </Box>
    </>
  );
};

export default Home;
