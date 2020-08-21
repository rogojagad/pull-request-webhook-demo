exports.mock = () => {
    jest.mock("../../../src/firebase/client", () => {
        const get = jest.fn();
        const set = jest.fn();

        return {
            collection: jest.fn(() => ({
                where: jest.fn(() => ({
                    get,
                })),
                doc: jest.fn(() => ({
                    get,
                    set,
                })),
            })),
        };
    });
};
