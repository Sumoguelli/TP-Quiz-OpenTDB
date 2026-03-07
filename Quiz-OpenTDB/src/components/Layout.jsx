function Layout({ children }) {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {children}
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f9",
    },
    card: {
        width: "400px",
        padding: "30px",
        borderRadius: "10px",
        background: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
};

export default Layout;