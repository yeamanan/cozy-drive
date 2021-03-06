import React from 'react'

import Recipient from './Recipient'
import { getRecipients, getPrimaryEmail, getPrimaryCozy } from '..'

const WhoHasAccess = ({ recipients }) => (
  <div>
    {recipients.map(({ contact, status }) => (
      <Recipient name={getPrimaryEmail(contact)} url={getPrimaryCozy(contact)} status={status} />
    ))}
  </div>
)

class StatefulWhoHasAccess extends React.Component {
  state = {
    recipients: []
  }

  componentDidMount () {
    const { t } = this.context
    getRecipients(this.props.document)
    .then(recipients =>
      recipients.map(recipient => {
        const status = recipient.status === 'accepted'
         ? t(`Share.status.${recipient.status}.${recipient.type}`)
         : recipient.status
           ? t(`Share.status.${recipient.status}`)
           : t('Share.status.pending')
        return {
          ...recipient,
          status
        }
      })
    )
    .then(recipients => {
      this.setState(state => ({ ...state, recipients }))
    })
    .catch(console.error.bind(console))
  }

  render () {
    return <WhoHasAccess recipients={this.state.recipients} />
  }
}

export default StatefulWhoHasAccess
