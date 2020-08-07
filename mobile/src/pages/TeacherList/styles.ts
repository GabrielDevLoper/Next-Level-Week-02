import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f7",
  },

  teacherList: {
    marginTop: -40,
  },

  searchForm: {
    marginBottom: 24,
  },

  label: {
    color: "#d4c2ff",
    fontFamily: "Poppins_400Regular",
  },

  input: {
    height: 54,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },

  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  grow: {
    flex: 1,
    marginRight: 8,
  },

  labelTextOpenFilter: {
    color: "#d4c2ff",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    fontSize: 16,
  },

  buttonOpenFilter: {
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  filter: {
    marginRight: 8,
  },

  submitButton: {
    backgroundColor: "#04d361",
    height: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  submitButtonText: {
    color: "#fff",
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
  },
});

export default styles;
