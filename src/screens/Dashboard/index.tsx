
import React from 'react';

import { Text } from 'react-native';
import { Container, Header ,
    UserInfo,
    UserPhoto,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    IconPower,
 } from './styles';

export function Dashboard(){
    return(
        <Container>
            <Header>
            <UserWrapper>

           
            <UserInfo>
            <UserPhoto source={{uri : 'https://avatars.githubusercontent.com/u/43159625?v=4'}}/>

                <User>
                    <UserGreeting>
                        Olá,
                    </UserGreeting>
                    <UserName>
                        Ton
                    </UserName>
                </User>
            </UserInfo>
            <IconPower name="power" />
            </UserWrapper>
            </Header>
            
        </Container>
    )
}
