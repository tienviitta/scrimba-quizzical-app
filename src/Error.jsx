export default function Error({ message }) {
  return (
    <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
      {message}
    </div>
  );
}
