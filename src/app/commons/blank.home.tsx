import React from "react";
import { CenterCardComponent, PageComponent, SectionComponent } from "./common.components";

const BlankHome = () => {
    return (
        <PageComponent>
            <SectionComponent>
                <CenterCardComponent id="blankhome-card-1">
                    <div className="text-secondary-600 font-bold">
                        <p>
Conclusion and Call to Action
Under the leadership of JAF Enterprise, in partnership with private investors, this project represents a strategic, timely, and transformative investment for Linden and Guyana.
It advances:
Tourism diversification
Regional economic equity
Job creation and skills development
Sustainable private-sector-led growth
This proposal calls on Cabinet, investors, and development partners to support the initiative as a flagship hospitality and entertainment development positioning Linden as a premier inland commercial and leisure hub and driving long-term prosperity for Region Ten and the nation.
                        </p>
                    </div>
                    
                    <div className="text-tertiary-600 border-t-2 border-qua-300 md:border-l-2 md:border-t-0">
                        <p className="md:ml-2">
Regulatory and Governance Considerations
The casino component will operate under:
National casino licensing and oversight
Clear gaming tax and levy frameworks
Strong anti-money laundering (AML) compliance
Responsible gaming and social safeguards
Regular audits and reporting requirements
JAF Enterprise commits to full regulatory compliance and responsible corporate citizenship.
                        </p>
                    </div>
                </CenterCardComponent>
            </SectionComponent>
        </PageComponent>
    )
}

export default BlankHome