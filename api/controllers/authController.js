export const register = async (req, res) => {
    console.log("REGISTER TETİKLENDİ", req.body);
    return res.status(200).json({ message: "Backend çalışıyor" });
};

export const login = (req, res) => {
    return res.json({ message: "giriş işlemi" });
};

export const logout = (req, res) => {
    return res.json({ message: "çıkış işlemi" });
};
