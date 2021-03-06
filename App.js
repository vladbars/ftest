/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    InteractionManager
} from 'react-native';
//import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob'
import FolioView from './FolioView'
//const { RNFolioReader } = NativeModules



export default class App extends Component<{}> {

    state = {
        downloaded: false
    }
    componentDidMount() {
        //RNFolioReader.open(`testbook`)
//this.openEpub()
//return

        const dirs = RNFetchBlob.fs.dirs
        const url = 'https://www.inkitt.com/epubs/' + encodeURIComponent('I Dare You To Love Me - Becca Fox (1).epub')
        console.info(url)
        RNFetchBlob.config({
            fileCache : true,
            appendExt : 'epub'
             //path: dirs.DocumentDir + '/testbook.epub'
            /*,
            addAndroidDownloads : {
                useDownloadManager : false, // <-- this is the only thing required
                // Optional, override notification setting (default to true)
                notification : false,
                // Optional, but recommended since android DownloadManager will fail when
                // the url does not contains a file extension, by default the mime type will be text/plain
                mime : 'application/epub+zip',
                //description : 'A book downloaded by download manager.'
            }
            */
        })
            .fetch('GET', url)
            // .fetch('GET',`https://djjob.ru/book/testbook.epub`)
            .then((res) => {
                console.log(res.path())
                const filePath = Platform.OS === 'android' ? res.path() : res.path()
                this.setState({downloaded: true, filePath })
                // open the document directly
                //RNFetchBlob.ios.previewDocument(res.path())
                // or show options
                // RNFetchBlob.ios.openDocument(res.path())
            })

        /*
             const filePath =`${RNFS.CachesDirectoryPath}/testbook3.epub`
             RNFS.downloadFile({
               fromUrl: 'https://djjob.ru/book/testbook.epub',
               toFile: filePath,
              }).promise.then((r) => {
                //console.log(r)
                this.setState({downloaded: true, filePath}, this.openEpub)

              });
              */

    }

    openEpub =  () => {
        const { filePath } = this.state
        console.log(filePath)
        InteractionManager.runAfterInteractions(() => {
           // RNFolioReader.open(filePath)
        });

    }
    render() {
        const { filePath } = this.state
        return (

            <View style={{flex: 1}}>
                {this.state.downloaded ? <FolioView resourcePath={filePath} style= {{flex: 1}} /> : <ActivityIndicator/>}
                <Text style={styles.txtOverlay}>This is overlay</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  txtOverlay: {
    position:'absolute',
    fontSize: 20,
    top: 100
  },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
