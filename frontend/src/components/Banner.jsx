function Banner() {
  return (
    <div style={styles.banner}>
      <div style={styles.overlay}>
        <h1>Discover Amazing Events</h1>
        <p>Concerts • Tech Conferences • Festivals • Shows</p>
      </div>
    </div>
  );
}

const styles = {
  banner: {
    height: "350px",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1506157786151-b8491531f063')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative"
  },
  overlay: {
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "80px"
  }
};

export default Banner;