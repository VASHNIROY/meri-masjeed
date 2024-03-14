export const ramzanTable = `
CREATE TABLE IF NOT EXISTS ramzan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    day VARCHAR(20),
    sehar TIME,
    iftar TIME
);`;
