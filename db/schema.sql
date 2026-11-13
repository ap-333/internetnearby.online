CREATE TABLE IF NOT EXISTS leads (
  id                 BIGSERIAL PRIMARY KEY,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  status             TEXT NOT NULL DEFAULT 'new'
                     CHECK (status IN ('new','contacted','verifying_availability','qualified','enrolled','not_available','unreachable','do_not_contact','closed')),
  street_address     TEXT NOT NULL,
  unit               TEXT,
  zip                TEXT NOT NULL,
  needs              TEXT[] NOT NULL,
  full_name          TEXT NOT NULL,
  phone              TEXT NOT NULL,
  email              TEXT,
  consent_contact    BOOLEAN NOT NULL,
  consent_marketing_calls BOOLEAN NOT NULL DEFAULT FALSE,
  consent_marketing_sms   BOOLEAN NOT NULL DEFAULT FALSE,
  consent_text_version    TEXT NOT NULL,
  consent_at         TIMESTAMPTZ NOT NULL,
  consent_ip         INET,
  user_agent         TEXT,
  page_url           TEXT,
  utm_source TEXT, utm_medium TEXT, utm_campaign TEXT, utm_term TEXT, utm_content TEXT,
  gclid TEXT, gbraid TEXT, wbraid TEXT, referrer TEXT, landing_path TEXT,
  crm_synced_at      TIMESTAMPTZ,
  notes              TEXT
);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status, created_at DESC);
CREATE INDEX IF NOT EXISTS leads_zip_idx ON leads (zip);
