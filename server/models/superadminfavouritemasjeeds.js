export const superadminfavouriteMasjeedsTable = `
    CREATE TABLE IF NOT EXISTS superadminfavouritemasjeeds(
        id INT AUTO_INCREMENT PRIMARY KEY,
        favouritemasjeddid INT NOT NULL,
        FOREIGN KEY (favouritemasjeddid) REFERENCES masjeed(id)
    )
`;
