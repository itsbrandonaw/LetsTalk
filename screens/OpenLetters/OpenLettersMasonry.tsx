import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import {View} from 'react-native';

const OpenLettersMasonry = ({list}) => {
    return (
        <MasonryList
            data={list}
            keyExtractor={(item): string => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <CardItem />}
            refreshing={false}
            // onRefresh={() => refetch({first: ITEM_CNT})}
            // onEndReachedThreshold={0.1}
            // onEndReached={() => loadNext(ITEM_CNT)}
/>
    )
}

export default OpenLettersMasonry;