import { FlatList, View } from "react-native";
import { Text, Divider, ActivityIndicator } from "react-native-paper";

export default function ShowsList({ shows, loading, error, isHorizontal = true, Component, type }) {
    if (loading) {
        return <ActivityIndicator color="orange" animating={true} size="small" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding:50 }} />;
    }
    
    if (error) {
        return <Text style={{alignSelf:'center'}}>Error: {error.message}</Text>;
    }

    const dataWithEndSpcae = [...shows, { isSpacer: true }];

    return (
        <View>
            <FlatList
                data={dataWithEndSpcae}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) =>
                    item.isSpacer
                        ? <View style={{
                            width: isHorizontal ? 100 : '100%',
                            height: isHorizontal ? '100%' : 40,
                            backgroundColor: '#fff'
                        }} />
                        : <Component show={item} type={type} />
                }
                horizontal={isHorizontal}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                legacyImplementation={false}
                scrollEnabled={isHorizontal}
                maxToRenderPerBatch={10}
                ItemSeparatorComponent={() => <Divider style={{ marginVertical: 10 }} />}
            />
        </View>
    );
}