export const recentmasjeedtable = `
    CREATE TABLE IF NOT EXISTS recentmasjeeds (
        id INT AUTO_INCREMENT PRIMARY KEY,
        imei VARCHAR(255) NOT NULL,
        recentmasjeedid INT, 
        FOREIGN KEY (recentmasjeedid) REFERENCES masjeed(id)
    )
`;
