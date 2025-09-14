// middleware/validateDrug.js
module.exports = (req, res, next) => {
    const { name, dosage, card, pack, perDay } = req.body;

    // a. Name has length more than five
    if (!name || name.length <= 5) {
        return res.status(400).json({
            success: false,
            message: "❌ Name must be longer than 5 characters"
        });
    }

    // b. Dosage format: XX-morning,XX-afternoon,XX-night
    const dosagePattern = /^\d{1,2}-morning,\d{1,2}-afternoon,\d{1,2}-night$/;
    if (!dosage || !dosagePattern.test(dosage)) {
        return res.status(400).json({
            success: false,
            message: "❌ Dosage must follow format: XX-morning,XX-afternoon,XX-night"
        });
    }

    // c. Card > 1000
    // if (!card || Number(card) <= 1000) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "❌ Card must be more than 1000"
    //     });
    // }

    // d. Pack > 0
    if (!pack || Number(pack) <= 0) {
        return res.status(400).json({
            success: false,
            message: "❌ Pack must be more than 0"
        });
    }

    // e. PerDay > 0 and < 90
    if (!perDay || Number(perDay) <= 0 || Number(perDay) >= 90) {
        return res.status(400).json({
            success: false,
            message: "❌ PerDay must be more than 0 and less than 90"
        });
    }

    // Nếu hợp lệ => tiếp tục
    next();
};