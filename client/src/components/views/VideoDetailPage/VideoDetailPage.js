import React, { useState, useEffect } from 'react'
import { Avatar, Row, Col, List } from 'antd';
import Axios from 'axios';
import SideVideo from './Section/SideVideo';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId // App.js videoId url로 넘겨받음
    const variable = { videoId: videoId }

    const [VideoDetail, setVideoDetail] = useState([])

    useEffect(() => {
        

        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    setVideoDetail(response.data.videoDetail)
                }else {
                    alert('비디오 정보를 가져오는데 실패했습니다.')
                }
            })

    }, [])

    if(VideoDetail.writer){
        return (
            <Row gutter={[16, 16]} style={{ overflow: 'hidden' }}>
                <Col lg={18} xs={24}>
    
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
            
                        <List.Item
                            actions
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />

                        </List.Item>
    
                        {/* Comments */}

                    </div>


                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    }else {
        return (
            <div>...loading</div>
        )
    }

    
}

export default VideoDetailPage
