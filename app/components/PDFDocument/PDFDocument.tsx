import {Document, Page, Text, View} from '@react-pdf/renderer';
import {Color} from "@/libs/types/Color";

type PDFDocumentProps = {
    colors: Color[];
}


export default function PDFDocument({colors}: PDFDocumentProps) {
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={{
                flexDirection: 'row',
                padding: '30px',
                backgroundColor: 'white',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
            }}>
                {colors.map((color: Color, index: number) => (
                    <View
                        key={index}
                        style={{
                            width: 253,
                            height: 225,
                            borderRadius: '20px',
                            marginBottom: 5,
                            backgroundColor: color.hex,
                            padding: '15px 20px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <Text style={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: color.isDarkColor ? 'white' : 'black'
                        }}>{color.hex.toUpperCase()}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    )
}