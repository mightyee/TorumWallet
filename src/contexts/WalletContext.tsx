import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletContext = createContext({});

export interface IUseWallet {
    walletCoinIds: string[];
    storeWalletlistCoinId: (coinId?: string) => void;
    removeWalletlistCoinId: (coinId?: string) => void;
    setWalletCoinIds: (coinId?: string) => void;

}

export const useWalletlist = () => useContext(WalletContext) as IUseWallet;

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [walletCoinIds, setWalletCoinIds] = useState<string[]>([]);

    const getWalletlistData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@walletlist_coins");
            setWalletCoinIds(jsonValue != null ? JSON.parse(jsonValue) : []);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getWalletlistData()
        // AsyncStorage.clear()
    }, [])

    const storeWalletlistCoinId = async (id: string) => {
        try {
            const newWalletlist = [...walletCoinIds, id];
            const jsonValue = JSON.stringify(newWalletlist);
            await AsyncStorage.setItem('@walletlist_coins', jsonValue);
            await setWalletCoinIds(newWalletlist);
        } catch (e) {
            console.log(e)
        }
    }

    const removeWalletlistCoinId = async (id: string) => {
        const newWalletlist = walletCoinIds.filter((coinIdValue) => String(coinIdValue) !== String(id));

        const jsonValue = JSON.stringify(newWalletlist);
        await AsyncStorage.setItem('@walletlist_coins', jsonValue);
        await setWalletCoinIds(newWalletlist);
    }


    const contextValue = {
        walletCoinIds,
        storeWalletlistCoinId,
        removeWalletlistCoinId,
        setWalletCoinIds,
    };


    return (
        <WalletContext.Provider value={contextValue}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletProvider;